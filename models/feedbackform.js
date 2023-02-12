const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Feedback =new Schema ({

  
feedback:{
    name:{type:string},
    email:{type:string},
    phoneNumber:{type:string},
    message:{type:string}
}
},
{
    timestamps: true
}); 

const feedbackForm = mongoose.model("feedbackForm", Feedback);

module.exports = feedbackForm;