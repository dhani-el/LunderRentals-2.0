require("dotenv").config();
const express = require("express");
const route  = express.Router();
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const USERDB = require("../Schemas/userSchema");


passport.use(new LocalStrategy(async function _verify(username, password,done){
    const user = await USERDB.findOne({name:username});

    if(!user) {
        console.log("no user");
        return done(null, false, {message:"user with this username does not exist"});
    }
    else if (user.password !== password) {
        console.log("wrong password");
        return done(null, false, {message:"password is wrong"});
    }
    else return done(null, user)
}));

passport.serializeUser(function(user,done){
    return done(null, user.name);
});

passport.deserializeUser(async function(username,done){
    const user = await USERDB.findOne({name:username});
    return done(null,user);
});

route.post("/login",  passport.authenticate('local',{failureRedirect:"/login"}), function(req, res){
 
    console.log(req.user,"and this");
    res.send(req.user.name);
});

route.post("/signup",async function(req,res){
    const {name,email,password} = req.body;
    try{
        await USERDB.create({name,email,password});
    }catch(error){
        console.log(error);
        res.send("error encountered");
    }
    res.send("account created successfully")
})

module.exports = route;