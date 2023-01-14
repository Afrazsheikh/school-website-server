const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema =new Schema ({
    logoImage: String,
    bannerImage: [{type: String}],
    bannerTitle: [{type: String}],
    bannerDesc: [{type: String}],
    aboutTitle: String,
    aboutSummary: String,
    aboutPhone: String,
    aboutImage: String,
}); 

const newsAdd = mongoose.model("newsAdd", newsSchema);

module.exports = newsAdd;