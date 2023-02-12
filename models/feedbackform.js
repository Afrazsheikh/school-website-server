const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Feedback =new Schema ({

    name:{type:String},
    email:{type:String},
    phoneNumber:{type:String},
    message:{type:String}
},
{
    timestamps: true
}); 

const feedbackForm = mongoose.model("feedbackForm", Feedback);

module.exports = feedbackForm;