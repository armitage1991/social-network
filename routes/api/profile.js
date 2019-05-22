const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load validation

const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');



//Load profile model

const Profile = require('../../models/profile')

// Loading user model

const User = require('../../models/User')

//@route GET api/profile/test
//@Description test post route
//@acess public

router.get('/test',(req,res)=>res.json({msg:'Profile works'}));

//@route GET api/profile/test
//@Description get current users profile
//@acess private

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const errors = {};
    Profile.findOne({user:req.user.id})
            .populate('user',['name','avatar'])
            .then(profile=>{
                if(!profile){
                    errors.noprofile = 'there is no profile for this user';
                    res.status(404).json({errors});
                }

                
                res.json(profile);
            })

            .catch(err=>res.status(404).json(err));
});

//@route GET api/profile/handle/:handle
//@Description get profile by handle
//@acess public

router.get('/handle/:handle',(req,res)=>{
    Profile.findOne({handle:req.params.handle})
        .populate('user',['name','avatar'])
        .then(profile=>{
            if(!profile){
                errors.noprofile = 'there is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err=> res.status(404).json(err))
});

//@route GET api/profile/user/:user_id
//@Description get profile by handle
//@acess public

router.get('/user/:user_id',(req,res)=>{
    Profile.findOne({_id:req.params.user_id})
        .populate('user',['name','avatar'])
        .then(profile=>{
            if(!profile){
                errors.noprofile = 'there is no profile for this user';
                res.status(404).json({nonprofile:errors});
            }

            res.json(profile);
        })
        .catch(err=> res.status(404).json(err))
});

//@route GET api/profile/all
//@Description get profile by handle
//@acess public

router.get('/all',(req,res)=>{
    Profile.find()
        .populate('user',['name','avatar'])
        .then(profile=>{
            if(!profile){
                errors.noprofile = 'there is no profile for this user';
                res.status(404).json({nonprofile:errors});
            }

            res.json(profile);
        })
        .catch(err=> res.status(404).json(err))
});

//@route POST api/profile/education
//@Description add education to profile
//@acess private

router.post('/education',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validateEducationInput(req.body);
    
    if(!isValid){
        console.log('caiu aqui');
        return res.status(400).json(errors);
    }

    

    Profile.findOne({user:req.user.id})
        .then(profile=>{
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description:req.body.description
            }

            // add to exp array in profile

            console.log(profile);
          

            profile.education.unshift(newEdu);

            profile.save().then(profile=>{res.json(profile)})
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        })
});

//@route POST api/profile/experience
//@Description add experience to profile
//@acess private

router.post('/experience',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validateExperienceInput(req.body);
    
    if(!isValid){
        console.log('caiu aqui');
        return res.status(400).json(errors);
    }

    

    Profile.findOne({user:req.user.id})
        .then(profile=>{
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description:req.body.description
            }

            // add to exp array in profile

            console.log(profile);
          

            profile.experience.unshift(newExp);

            profile.save().then(profile=>{res.json(profile)})
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        })
});



//@route GET api/profile
//@Description get current users profile
//@acess private

router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    //getting fields
    const {errors, isValid} = validateProfileInput(req.body);

    // Check validation

    if(!isValid){
        // return any errors witg 400 hundred

        return res.status(400).json(errors);
    }
    const profileFields={};
    profileFields.user = req.user.id;

    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.github) profileFields.github = req.body.github;
    //skills

    if(typeof(req.body.skills !== undefined )){
        profileFields.skills = req.body.skills.split(',')
    }

    profileFields.social = {};

    if(req.body.youtube)     profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter)     profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook)     profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin)     profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram)     profileFields.social.instagram = req.body.instagram;


    Profile.findOne({user:req.user.id})
        .then(profile=>{
            if(profile){
                //update the profile
                Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true})
                .then(profile=>res.json(profile));
            }else{
                //create

                Profile.findOne({handle:profileFields.handle})
                    .then(profile=>{
                        if(profile){
                            errors.handle = 'handle already exists'
                            res.status(400).json(errors);
                        }

                        //Save profile

                        new Profile(profileFields).save()
                            .then(profile=>{
                                res.json(profile);
                            });
                    });
            }
        })


    

});

module.exports = router;