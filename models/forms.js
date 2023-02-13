const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const forms =new Schema ({
    
    name:{type:String},
    email:{type:String},
    phoneNumber:{type:String},
    message:{type:String}

},
{
    timestamps: true
}); 

const form = mongoose.model("forms", forms);

module.exports = form;