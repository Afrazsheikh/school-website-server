const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const school =new Schema ({
    name: {type: String},
    logoImage: {type: String},
    phone: {type: String},
    email: {type: String},
    address: {
        street: {type: String},
        city: {type: String},
        state: {type: String},
        country: {type: String},
        pincode: {type: String},
    },
    section1: [
        {
            title: {type: String},
            slideImg1: {type: String},
            slideImg2: {type: String}
        },
    ],
    section2: {
        title: {type: String},
        description: {type: String},
        bottomImage1: {type: String},
        bottomImage2: {type: String},
        bottomImage3: {type: String},
        bottomText1: {type: String},
        bottomText2: {type: String},
        bottomText3: {type: String},
        bottomSubText1: {type: String},
        bottomSubText2: {type: String},
        bottomSubText3: {type: String}
    },
    section3: {
        title: {type: String},
        description: {type: String},
        videoUrl: {type: String},
        img: {type: String},
        videoThumb: {type: String},
    },
    section4: [
        {
            title: {type: String},
            description: {type: String},
            img: {type: String},
        },
    ],
    section5: [
        {
            heading: {type: ObjectId},
            newsDate: {type: String},
            img: {type: String},
        }
    ],
    section7: {
        title: {type: String},
        subTitle: {type: String},
        topLeftText: {type: String},
        bottomLeftText: {type: String},
        topRightText: {type: String},
        bottomRightText: {type: String},
        topLeftImage: {type: String},
        topRightImage: {type: String},
        centerImage: {type: String},
        bottomLeftImage: {type: String},
        bottomRightImage: {type: String}
    },
    galleries: [{
        img: {type: String},
    }],
},
{
    timestamps: true
}); 

const School = mongoose.model("school", school);

module.exports = School;