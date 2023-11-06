const passport = require("passport");
const Strategy = require("passport-local");
const USERDB = require("../Schemas/userSchema");



passport.use(new Strategy(async function _verify(username, password,done){
    const user = await USERDB.findOne({name:username});

    if(!user) {
        console.log("no user");
        return done(null, false, {message:"user with this username does not exist"});
    }
    else if (user.password !== password) {
        console.log("wrong password");
        return done(null, false, {message:"password is wrong"});
    }
    console.log("user is currently " ,user);
   return done(null, user)
}));

