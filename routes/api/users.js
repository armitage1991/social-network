const express = require('express');
const router = express.Router();
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs');
const jwtToken = require('jsonwebtoken')
const  keys = require('../../config/keys')
const passport = require('passport');

//load input validators

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// load user model

const User = require('../../models/User');

//@route GET api/users/test
//@Description test post route
//@acess public

router.get('/test',(req,res)=>res.json({msg:'Users work'}));

//@route GET api/users/register
//@Register a user
//@acess public

router.post('/register',(req,resp)=>{

    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid){
        return resp.status(400).json({errors:errors})
    }

    User.findOne({email:req.body.email})
        .then(user =>{
            if(user){
                errors = {
                    email:'this e-mail already exists'
                }
                
                return resp.status(400).json({errors})
            }else{
                const avatar = gravatar.url(req.body.email,{
                    s:'200',//Size
                    r:'pg',// Rating
                    d:'mm'//Default
                });
                const newUser = new User({
                    name: req.body.name,
                    email:req.body.email,
                    avatar: avatar,
                    password:req.body.password,
                    date:Date.now()
                })


            //encrypting the password

            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{

                    newUser.password = hash;
                    newUser.save()
                            .then(user => resp.json(user))
                            .catch(err => console.log(err))
                })
            })
            }

            

        })
})


router.post('/login',(req,res)=>{
    console.log(req.body);
    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid){
        console.log(errors)
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email})
        .then(user=>{
            //check for user

            if(!user){
                const errors = {
                    email:'user not found'
                }
                return res.status(404).json(errors)
            }

            // check Password

            bcrypt.compare(password,user.password).then(isMatch=>{
                if(isMatch){

                    // create the payload
                    const payload = {id: user.id,email:user.email,name:user.name,avatar:user.avatar}
                    // sign the token
                    jwtToken.sign(payload,keys.secret,{expiresIn:3600},(err,token)=>{
                        res.json({
                            success:true,
                            token:'Bearer ' + token
                        })
                    })
                }else{
                    const errors = {
                        password:'password incorrect'
                    }
                    return res.status(400).json(errors)
                }
            })
                
        })
})

// put headers later on

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({id:req.user.id,
            email:req.user.email,
            name:req.user.name,
            avatar:req.user.avatar})
})

module.exports = router;