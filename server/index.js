require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Parser = require("body-parser");
const cookieParser = require("cookie-parser")
const port = process.env.PORT || 3000;
const path = require("path");
const Cors = require("cors");
const passport  = require("passport");
const session = require("express-session");
const MongoStore  = require("connect-mongo");

require("./Utils/authUtils");

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection
db.once('open', function(){
    console.log("mongodb database is now online");
});


app.use(Cors({origin:["http://localhost:5173"],
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:["Content-Type","Authorization"],
    credentials:true,}));

app.use(Parser.urlencoded({extended:false}));
app.use(Parser.json());
app.use(express.static(path.join(__filename,"../server/dist")));
app.use(express.static(path.join(__filename,"../server/public")));
// app.use(express.static("/dist"));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:true,
    cookie:{
        secure : false,
        sameSite:'lax',
         maxAge: 1000 * 60 * 60 * 60 * 24 * 2,
    },
    store: MongoStore.create({
        mongoUrl : process.env.DATABASE_URL,
        ttl: 2 * 24 * 60 * 60,
        autoRemove: 'native',
        touchAfter: 24 * 3600
    })
}));

app.use(passport.initialize());
app.use(passport.session());



const DataRoute = require("./Routes");
const AuthRoute = require("./Routes/auth");

app.use("/data/api",DataRoute);
app.use("/auth",AuthRoute);

app.get("*",function(req,res){

    res.sendFile(path.join(__dirname,"../server/dist/index.html"));
    res.sendFile(path.join(__dirname,"../server/dist/index.html"));
    // res.sendFile("./dist/index.html");
});

app.listen(port, function(){
    console.log("server started");
});

process.on('SIGINT',function(){
    mongoose.connection.close();
    process.exit(0);
})