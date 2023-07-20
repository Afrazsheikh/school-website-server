const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facilitySchema =new Schema ({
   faciltyTitle: String,
   facilityDesc : String,
    // bannerImage: [{type: String}],
    // bannerTitle: [{type: String}],
    // bannerDesc: [{type: String}],
    leftHeading : String,
    rightHeading  : String,
    leftSubHeading: String,
    rightSubHeading : String,
    LeftSummary: String,
   rightSummary: String,
    aboutImage: String,
}); 

const facilityAdd = mongoose.model("facilityAdd", facilitySchema);

module.exports = facilityAdd;