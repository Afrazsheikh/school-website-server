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
            heading: {type: String},
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
    section6: [{
        academicYear: {
            from: {type: Number},
            to: {type: Number},
        },
        title: {type: String},
        subTitle: {type: String},
        coverImage: {type: String}
    }],
    careers: {
        mainTitle: {type: String},
        description: {type: String},
        img: {type: String}
    },
    studCorner: {
        mainTitle: {type: String},
        title1: {type: String},
        desc1: {type: String},
        img1: {type: String},
        title2: {type: String},
        desc2: {type: String},
        img2: {type: String},
        title3: {type: String},
        desc3: {type: String},
        img3: {type: String},
        title4: {type: String},
        desc4: {type: String},
        img4: {type: String}
    },
    aboutUs: {
        mainTitle: {type: String},
        title1: {type: String},
        desc1: {type: String},
        img1: {type: String},
        title2: {type: String},
        desc2: {type: String},
        img2: {type: String},
        title3: {type: String},
        desc3: {type: String},
        img3: {type: String},
        title4: {type: String},
        desc4: {type: String},
        img4: {type: String},
    },
    admission: {
        step1Title: {type: String},
        step1Desc: {type: String},
        step2Title: {type: String},
        step2Desc: {type: String},
        step3Title: {type: String},
        step3Desc: {type: String},
        step4Title: {type: String},
        step4Desc: {type: String}
    },
    documents: {
        trustDoc: {type: String},
        nocDoc: {type: String},
        recogDoc: {type: String},
        buildingDoc: {type: String},
        fireDoc: {type: String},
        deoDoc: {type: String},
        healthDoc: {type: String},
        feeDoc: {type: String},
        smcDoc: {type: String},
        ptaDoc: {type: String},
        resultDoc: {type: String},
        /* trustDoc: {type: String},
        trustDoc: {type: String},
        trustDoc: {type: String}, */
    },
    facility: { 
        imgF1: {type: String},
        imgF2: {type: String},
        imgF3: {type: String},
        imgF4: {type: String},
        imgF5: {type: String},
        imgF6: {type: String},
     

        mainTitle: {type:String}, 
        mainDesc: {type:String}, 
        titleLeft: {type:String}, 
        titleRight: {type:String}, 
        titleSubLeft1: {type:String}, 
        summaryL1: {type:String}, 
        titleSubRight1: {type:String}, 
        titleSubLeft2: {type:String}, 
        titleSubLeft3: {type:String}, 
        titleSubLeft4: {type:String}, 
        titleSubLeft5: {type:String}, 
        titleSubRight2: {type:String}, 
        titleSubRight3: {type:String}, 
        titleSubRight4: {type:String}, 
        titleSubRight5: {type:String}, 
          summaryL2: {type:String}, 
          summaryL3: {type:String}, 
          summaryL4: {type:String}, 
          summaryL5: {type:String}, 
          desc1: {type:String}, 
          desc2: {type:String}, 
          desc3: {type:String}, 
          desc4: {type:String}, 
          desc5: {type:String}, 
         


     

     



    }
},
{
    timestamps: true
}); 

const School = mongoose.model("school", school);

module.exports = School;