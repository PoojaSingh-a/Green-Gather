const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model('Campaign',campaignSchema);