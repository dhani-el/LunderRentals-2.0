const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    cart:[{type: mongoose.Schema.Types.ObjectId, ref:"DATA-MODEL"}]

});

const userModel = new mongoose.model("USER-MODEL",userSchema);

module.exports = userModel;