const { ObjectID } = require('mongodb');
const logger = require('../../config/logger');
const adminService = require('../service/adminServices');


const addLogo = (req,res,next)=>{
    logger.trace("inside add Logo controller");

    adminService.addLogo(req.payload.schoolId, req.body.logoFile).then(async (resp)=>{
        res.status(200).json({success: true, message: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

const getSettings = (req, res) => {
    
    logger.trace("inside get settings controller");
    
    adminService.getSettings(req.payload.schoolId).then(resp => {
        res.status(200).json({success: true, data: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

const updateSettings = (req,res,next)=>{
    logger.trace("inside update settings controller");

    adminService.updateSettings(req.payload.schoolId, req.body).then(async (resp)=>{
        res.status(200).json({success: true, message: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

const getSections = (req,res,next)=>{
    let secType = {};
    logger.trace("inside get sections controller ", secType);

    if(req.query.secType) {
        secType[req.query.secType] = 1;
    }
    
    adminService.getSections(req.payload.schoolId, secType).then(resp => {
        res.status(200).json({success: true, data: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}


const addSection = (req, res, next)=>{
    logger.trace("inside add section slides controller--->", req.body);
    let secType = req.body.secType;
    let secData = {}, section = "";

    if(secType == "sec1") 
    {
        section = "section1";
        secData = {
            title: req.body.title,
            slideImg1: req.body.slides[0].slideFile,
            slideImg2: req.body.slides[1].slideFile
        }
    }
    else if(secType == "sec2")
    {
        section = "section2";
        secData = req.body;
    }
    else if(secType == "sec3")
    {
        section = "section3";
        secData = req.body;
    }
    else if(secType == "sec4")
    {
        section = "section4";
        secData["title"] = req.body.title;
        secData["description"] = req.body.description;
        secData["img"] = req.body.slides[0].slideFile;
    }
    else if(secType == "sec5")
    {
        section = "section5";
        secData["heading"] = req.body.heading;
        secData["newsDate"] = req.body.newsDate;
        secData["img"] = req.body.slides[0].slideFile;
    }
    else if(secType == "sec6")
    {
        section = "galleries";
        secData = req.body.galleries
    }
    else
    {
        section = "section7";
        secData = req.body;
    }

    adminService.addSection(req.payload.schoolId, section, secData).then(async (resp)=>{
        logger.info('After adding section....', resp);
        req.body.slides.length = 0;
        res.status(200).json({success: true, message: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}
    
const updateSection = (req, res, next)=>{
    logger.trace("inside add updateSection controller--->", req.body);
    let secType = req.body.secType;
    let secData = {}, section = "";

    if(secType == "sec1") 
    {
        section = "section1";
        secData["id"] = req.body.id;
        secData["title"] = req.body.title;
    }
    else if(secType =="sec4")
    {
        section = "section4";
        secData["id"] = req.body.id;
        secData["title"] = req.body.title;
        secData["description"] = req.body.description;
    }
    else
    {

        section = "section5";
        secData["id"] = req.body.id;
        secData["heading"] = req.body.heading;
        secData["newsDate"] = req.body.newsDate;
    }

    adminService.updateSection(req.payload.schoolId, section, secData).then(async (resp)=>{
        logger.info('After updating section....', resp);
        res.status(200).json({success: true, message: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

const deleteSlide = (req,res,next)=>{
    let id = req.params.id;
    logger.trace("inside  delete slide controller",id);
    
    adminService.deleteSlide(req.payload.schoolId, id).then(async (data)=>{
        res.status(200).json({success: true, message: data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

const deleteSec4Slide = (req,res,next)=>{
    let id = req.params.id;
    logger.trace("inside  delete slide controller",id);
    
    adminService.deleteSec4Slide(req.payload.schoolId, id).then(async (data)=>{
        res.status(200).json({success: true, message: data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

const addSection2Img = (req, res) => {
    logger.trace("inside add section 2 img controller");

    adminService.addSection2Img(req.payload.schoolId, req.body.imgType, req.body.imgFile).then(async (resp)=>{
        res.status(200).json({success: true, message: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

const addSection3Img = (req, res) => {
    logger.trace("inside add section 2 img controller");

    adminService.addSection3Img(req.payload.schoolId, req.body.imgType, req.body.imgFile).then(async (resp)=>{
        res.status(200).json({success: true, message: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

//section 4
const addSection4Img = (req, res) => {
    logger.trace("inside add section 2 img controller");

    adminService.addSection4Img(req.payload.schoolId, req.body.imgType, req.body.imgFile).then(async (resp)=>{
        res.status(200).json({success: true, message: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

//section5
const addSection5Img = (req, res) => {
    logger.trace("inside add section 2 img controller");

    adminService.addSection5Img(req.payload.schoolId, req.body.imgType, req.body.imgFile).then(async (resp)=>{
        res.status(200).json({success: true, message: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}
const deleteSec5Slide = (req,res,next)=>{
    let id = req.params.id;
    logger.trace("inside  delete slide controller",id);
    
    adminService.deleteSec5Slide(req.payload.schoolId, id).then(async (data)=>{
        res.status(200).json({success: true, message: data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

const deleteGallery = (req,res,next)=>{
    let id = req.params.id;
    logger.trace("inside  deleteGallery controller",id);
    adminService.deleteGallery(req.payload.schoolId, id).then(async (data)=>{
        res.status(200).json({success:true, message: data});
    })
    .catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

// For Section 7
const addSection7Img = (req, res) => {
    logger.trace("inside add section 2 img controller");

    adminService.addSection7Img(req.payload.schoolId, req.body.imgType, req.body.imgFile).then(async (resp)=>{
        res.status(200).json({success: true, message: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

// Careers
const updateCareer = (req, res) => {
    logger.trace("inside update career controller");

    adminService.updateCareer(req.payload.schoolId, req.body).then(async (resp)=>{
        res.status(200).json({success: true, message: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

// Update Stud Corner
const updateStudData = (req, res) => {
    logger.trace("inside update career controller");
    let param = {};

    if(req.body.imgType) {
        if(req.body.imgType == "img1") {
            param = {
                "studCorner.img1": req.body.imgFile
            }
        }
        else if(req.body.imgType == "img2") {
            param = {
                "studCorner.img2": req.body.imgFile
            }
        }
        else if(req.body.imgType == "img3") {
            param = {
                "studCorner.img3": req.body.imgFile
            }
        }
        else {
            param = {
                "studCorner.img4": req.body.imgFile
            }
        }
    }
    else 
    {
        param = {
            "studCorner.mainTitle": req.body.mainTitle,
            "studCorner.title1": req.body.title1,
            "studCorner.desc1": req.body.desc1,
            "studCorner.title2": req.body.title2,
            "studCorner.desc2": req.body.desc2,
            "studCorner.title3": req.body.title3,
            "studCorner.desc3": req.body.desc3,
            "studCorner.title4": req.body.title4,
            "studCorner.desc4": req.body.desc4,
        }
    }

    adminService.updateStudData(req.payload.schoolId, param).then(async (resp)=>{
        res.status(200).json({success: true, message: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}


module.exports = {
    addLogo,
    getSettings,
    updateSettings,
    getSections,
    addSection,
    updateSection,
    deleteSlide,
    deleteSec4Slide,
    deleteSec5Slide,
    addSection5Img,
    addSection2Img,
    addSection3Img,
    addSection4Img,
    addSection7Img,

    deleteGallery,

    updateCareer,
    updateStudData
}