const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema =new Schema ({
    logoImage: String,
    bannerImage: [{type: String}],
    bannerTitle: [{type: String}],
    bannerDesc: [{type: String}],
    aboutTitle: String,
    aboutSummary: String,
    aboutPhone: String,
    aboutImage: String,
}); 

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;