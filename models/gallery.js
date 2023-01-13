const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const galleryuSchema =new Schema ({
    logoImage: String,
    bannerImage: [{type: String}],
    bannerTitle: [{type: String}],
    bannerDesc: [{type: String}],
    aboutTitle: String,
    aboutSummary: String,
    aboutPhone: String,
    aboutImage: String,
}); 

const GalleryAdd = mongoose.model("GalleryAdd", galleryuSchema);

module.exports = GalleryAdd;