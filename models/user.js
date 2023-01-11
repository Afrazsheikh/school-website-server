var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema ({
    firstName: { type: String },
    lastName: { type: String },
    email: { 
        type: String,
        trim:true, 
        lowercase:true
    },
    contact: { type: String, index: {unique: true}, required: [true, 'Phone no is required']},
    password:{ type: String},
    houseNumber: {type: String},
    street: {type: String},
    address:{ type: String},
    city:{ type: String},
    isDelete:{type:Boolean, default:false},
    postcode:{ type: String},
    isActive:{type: Boolean, default: false}
},
{
    timestamps: true
});

module.exports = mongoose.model('user', user);