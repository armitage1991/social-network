const jwtStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const moongoose = require('mongoose');
const User = moongoose.model('users');
const keys = require('./keys');

const opts = {}

opts.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = (passport) =>{
    passport.use(new jwtStrategy(opts,(jwt_payload,done)=>{
        User.findById(jwt_payload.id)
            .then(user=>{
                if(user){
                    return done(null,user);
                }
                return done(null,false);
            })
            .catch(err =>console.log(err));
    }))
}