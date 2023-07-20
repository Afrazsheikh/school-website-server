const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsMenuSchema =new Schema ({
    logoImage: String,
    bannerImage: [{type: String}],
    bannerTitle: [{type: String}],
    bannerDesc: [{type: String}],
    aboutTitle: String,
    aboutSummary: String,
    aboutPhone: String,
    aboutImage: String,
}); 

const newsMenuAdd = mongoose.model("newsMenuAdd", newsMenuSchema);

module.exports = newsMenuAdd;