const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Post = require('../../models/Post')
const Profile = require('../../models/profile');
const validatePostInput = require('../../validation/posts')

//@route GET api/posts/like/:id
//@Description test post route
//@acess Private

router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{

    Profile.findOne({user:req.user.id}).then(profile=>{
        Post.findById(req.params.id)
            .then(posts=>{
               //check if the user has already liked it
               if(posts.likes.filter(like=> liker.user.toString() === req.user.id).length > 0){
                    return res.status(400).json({alreadyliked:'User already like this post'});
               }

               // Add the user id to Likes array

               posts.likes.unshift({user:req.user.id});

               posts.save().then(post=>{
                   return res.json(post)
               })

            })
    }).catch(err=>res.status(404).json({nonprofile:'there is no profile found'}))

})

//@route GET api/posts/like/:id
//@Description unlike a post
//@acess Private

router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{

    Profile.findOne({user:req.user.id}).then(profile=>{
        Post.findById(req.params.id)
            .then(posts=>{
               //check if the user has already liked it
               if(posts.likes.filter(like=> like.user.toString() === req.user.id).length === 0){
                    return res.status(400).json({alreadyliked:'you have not liked this post'});
               }

               // getting the remove index

               const removeIndex =  posts.likes.map(item=> item.user.toString()).indexOf(req.user.id);

               // splice out array

               posts.likes.splice(removeIndex,1);



               posts.save().then(post=>{
                   return res.json(post)
               })

            })
    }).catch(err=>res.status(404).json({nonprofile:'there is no profile found'}))

})


//@route GET api/posts/all
//@Description retrieve all posts
//@acess public

router.get('/all',(req,res)=>{
    Post.find()
        .sort({date:-1})
        .then(posts=>{
            if(posts){
                res.json(posts)
            }

             res.status(404).json('posts not found')
        }).catch(err=>res.status(404).json(err))

});

//@route POST api/posts
//@Description find a post by its id
//@acess Private

router.get('/:id',(req,res)=>{
    Post.findById(req.params.id)
        .then(posts=>{
            if(posts){
                res.json(posts)
            }

             return res.status(404).json('posts not found')
        }).catch(err=>res.status(404).json({nonposts:"notfound"}))

});

//@route DELETE api/posts
//@Description Delete Posts
//@acess Private

router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
        .then(profile=>{
                if(profile){
                    Posts.findById(req.params.id).then(post=>{

                        if(post){
                            if(post.user.toString() !== req.user.id){
                                return res.status(401).json({notautorizaed:'not authorized'})
                            }else{
                                post.remove().then(()=>{

                                     res.json({success:true})
                                }).catch(err=>res.status(404).json({postnotfound:'No Post found'}))
                              
    
                            }
                        }else{
                            return res.status(401).json({notautorizaed:'not authorized'})

                        }


                        
                    })
                
                }
                

        }).catch(err => res.status(404).json({profilenotfound:'profile not found'}))

});

//@route POST api/posts
//@Description Create Posts
//@acess Private

router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{

    const {errors,isValid} = validatePostInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.user.avatar,
        user: req.user.id
    });

    newPost.save().then(post=>  res.json(post))
});

module.exports = router;