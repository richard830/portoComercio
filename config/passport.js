const JwtStrateggy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User =require('../models/user');
const keys = require('./keys');



module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = keys.secretOrKey;
    passport.use(new JwtStrateggy(opts, (jwt_payload, done)=>{
        User.ObtenerId(jwt_payload.id, (err,user)=>{
            if(err){
                return done(err,false);
            }
            if(user){
                return done(null,user);
            }else{
                return done(null , false)
            }
        })
    }))
}
