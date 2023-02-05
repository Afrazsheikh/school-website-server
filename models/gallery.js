const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const galleryuSchema =new Schema ({
    albumName: {type: String, index: {unique: true}, required: [true, 'Album name is required']},
    images: {type: Array, default: []}
},
{
    timestamps: true
}); 

const Album = mongoose.model("album", galleryuSchema);

module.exports = Album;