const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const school =new Schema ({
    logoImage: {type: String},
    address: {
        displayAddress: {type: String},
        street: {type: String},
        city: {type: String},
        State: {type: String},
        country: {type: String},
        pincode: {type: String},
    },
    section1: [
        {
            id: {type: ObjectId},
            title: {type: String},
            slideImg1: {type: String},
            slideImg2: {type: String}
        },
    ],
    section2: {
        id: {type: ObjectId},
        title: {type: String},
        description: {type: String},
        bottomText1: {type: String},
        bottomText2: {type: String},
        bottomText3: {type: String}
    },
    section3: {
        id: {type: ObjectId},
        title: {type: String},
        description: {type: String},
        img1: {type: String},
        img2: {type: String},
    },
    section4: [
        {
            id: {type: ObjectId},
            title: {type: String},
            description: {type: String},
            img: {type: String},
        },
    ],
    section5: [
        {
            id: {type: ObjectId},
            title: {type: String},
            img: {type: String},
        }
    ],
    section6: [
        {
            id: {type: ObjectId},
            img: {type: String},
        }
    ]
}); 

const School = mongoose.model("school", school);

module.exports = School;