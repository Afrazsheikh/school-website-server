var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const admin = new Schema ({
    email: { 
        type: String,
        trim:true, 
        lowercase:true
    },
    password:{ type: String},
    isActive:{type: Boolean, default: false}
},
{
    timestamps: true
});

module.exports = mongoose.model('admin', admin);