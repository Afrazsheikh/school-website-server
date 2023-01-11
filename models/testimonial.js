const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const testimonialSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    }
} ,{ timestamps: true }); 
const testimonial = mongoose.model("Testimonial", testimonialSchema);
module.exports = testimonial;

