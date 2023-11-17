require("dotenv").config();
const express = require("express");
const route  = express.Router();
const passport = require("passport");
const USERDB = require("../Schemas/userSchema");
const bcrypt = require("bcryptjs"); 

passport.serializeUser(function(user,done){
    console.log("this is the serialized function and this is the value of user",user)
    return done(null, {...user});
});

passport.deserializeUser( function(username,done){
    console.log("this is the deserialized function and this is the value of username ",username)
    return done(null,username);
});

route.post("/login",  passport.authenticate('local',{failureRedirect:"/login"}), function(req, res){
 
    console.log(req.user,"and this");
    console.log(req.isAuthenticated(),"user is auth");
    res.send(req.user.name);
});

route.post("/signup",async function(req,res){
    let {name,email,password} = req.body;
    try{
        password = await bcrypt.hash(password,10)
        await USERDB.create({name,email,password});
        console.log(password);
    }catch(error){
        console.log(error);
        res.send("error encountered");
    }
    res.send("account created successfully")
})

module.exports = route;