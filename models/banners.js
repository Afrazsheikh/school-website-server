const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bannerSchema =new Schema ({
    logoImage: String,
    bannerImage: [{type: String}],
    bannerTitle: [{type: String}],
    bannerDesc: [{type: String}],
    aboutTitle: String,
    aboutSummary: String,
    aboutPhone: String,
    aboutImage: String,
}); 

const BannersAdd = mongoose.model("BannersAdd", bannerSchema);

module.exports = BannersAdd;