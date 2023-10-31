require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Parser = require("body-parser");
const port = process.env.PORT || 3000;
const path = require("path");

const DataRoute = require("./Routes");

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection
db.once('open', function(){
    console.log("mongodb database is now online");
});



app.use(Parser.urlencoded({extended:false}));
app.use(Parser.json());
app.use("/data/api",DataRoute);
app.use(express.static(path.join(__dirname,"../dist")));

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"../dist/index.html"));
});

app.listen(port, function(){
    console.log("server started");
});

process.on('SIGINT',function(){
    mongoose.connection.close();
    process.exit(0);
})