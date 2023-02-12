const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const forms =new Schema ({

    enquiry : 
    { 
    name:{type:string},
    email:{type:string},
    phoneNumber:{type:string},
    message:{type:string}

},

},
{
    timestamps: true
}); 

const form = mongoose.model("form", forms);

module.exports = form;