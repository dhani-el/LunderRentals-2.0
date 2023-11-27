const mongoose  = require("mongoose");



const carSchema = new mongoose.Schema({
   brand:{
        type : String,
        required: true
    },
    logo:{
        type:String
    },
   name:{
    type: String,
    required: true
    },
    image:{
        type: String,
        required: true
    },
    year:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    address:{
        type : String,
        required: true,
    },
    meters:{
        type: String,
        required: true,
    },
    features:{
        type:Array,
        required:true
    },
    
});


const carModel = new mongoose.model("DATA-MODEL", carSchema);
module.exports = carModel;