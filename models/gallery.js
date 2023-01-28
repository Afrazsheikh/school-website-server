const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const galleryuSchema =new Schema ({
    galleries: [{
        logoImage: String,
    }]
},
{
    timestamps: true
}); 

const GalleryAdd = mongoose.model("GalleryAdd", galleryuSchema);

module.exports = GalleryAdd;