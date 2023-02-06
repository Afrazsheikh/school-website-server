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
        secData["academicYear"] = {
            from: '',
            to: ''
        };

        section = "section6";
        secData["title"] = req.body.title;
        secData["subTitle"] = req.body.subTitle;
        secData["academicYear"]["from"] = req.body.fromYear;
        secData["academicYear"]["to"] = req.body.toYear;
        secData["coverImage"] = req.body.slides[0].slideFile;
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
        req.body.slides.length = 0;
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
    else if(secType == "sec5")
    {

        section = "section5";
        secData["id"] = req.body.id;
        secData["heading"] = req.body.heading;
        secData["newsDate"] = req.body.newsDate;
    }
    else {
        section = "section6";
        secData["academicYear"] = {
            from: '',
            to: ''
        };
        secData["id"] = req.body.id;
        secData["title"] = req.body.title;
        secData["subTitle"] = req.body.subTitle;
        secData["academicYear"]["from"] = req.body.fromYear;
        secData["academicYear"]["to"] = req.body.toYear;
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
    logger.trace("inside add section 5 img controller");

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

//section6
const addSection6Img = (req, res) => {
    logger.trace("inside add section 6 img controller");

    adminService.addSection6Img(req.payload.schoolId, req.body.imgType, req.body.imgFile).then(async (resp)=>{
        res.status(200).json({success: true, message: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

const deleteSec6Slide = (req,res,next)=>{
    let id = req.params.id;
    logger.trace("inside  delete slide controller",id);
    
    adminService.deleteSec6Slide(req.payload.schoolId, id).then(async (data)=>{
        res.status(200).json({success: true, message: data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

const getGalleries = (req, res) => {
    logger.info("inside  get Gallery controller");
    adminService.getGalleries(req.query.album).then(async (data)=>{
        res.status(200).json({success:true, data: data});
    })
    .catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

const addGalleries = (req, res) => {
    logger.info("inside  add Gallery controller");
    adminService.addGalleries(req.body.album, req.body.galleries).then(async (data)=>{
        req.body.galleries.length = 0;
        res.status(200).json({success:true, message: data});
    })
    .catch(err=>{
        logger.fatal(err);
        req.body.galleries.length = 0;
        return res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

const deleteGallery = (req,res,next)=>{
    let album = req.params.id;
    logger.trace("inside  deleteGallery controller");
    adminService.deleteGallery(album, req.query.fileId).then(async (data)=>{
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

// about US readMore
const updateAboutRM = (req, res) => {
    logger.trace("inside update  controller");

    adminService.updateAboutRM(req.payload.schoolId, req.body).then(async (resp)=>{
        res.status(200).json({success: true, message: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}
//carrer
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
//addmission
const updateAdmData = (req, res) => {
    logger.trace("inside update  controller");
    let param = {};

        param = {
        
            "admission.step1Title": req.body.title1,
            "admission.step1Desc": req.body.description1,
            "admission.step2Title": req.body.title2,
            "admission.step2Desc": req.body.description2,
            "admission.step3Title": req.body.title3,
            "admission.step3Desc": req.body.description3,
            "admission.step4Title": req.body.title4,
            "admission.step4Desc": req.body.description4,
        }


    adminService.updateAdmData(req.payload.schoolId, param).then(async (resp)=>{
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

//update  About us
const updateAboutUs = (req, res) => {
    logger.trace("inside update career controller");
    let param = {};

    if(req.body.imgType) {
        if(req.body.imgType == "img1") {
            param = {
                "aboutUs.img1": req.body.imgFile
            }
        }
        else if(req.body.imgType == "img2") {
            param = {
                "aboutUs.img2": req.body.imgFile
            }
        }
       
        else {
            param = {
                "aboutUs.img3": req.body.imgFile
            }
        }
    }
    else 
    {
        param = {
            "aboutUs.mainTitle": req.body.mainTitle,
            "aboutUs.title1": req.body.title1,
            "aboutUs.desc1": req.body.desc1,
            "aboutUs.title2": req.body.title2,
            "aboutUs.desc2": req.body.desc2,
            "aboutUs.title3": req.body.title3,
            "aboutUs.desc3": req.body.desc3,
         
        }
    }

    adminService.updateAboutUs(req.payload.schoolId, param).then(async (resp)=>{
        res.status(200).json({success: true, message: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

// Gallery Album
const getAlbums = (req, res) => {
    logger.trace("inside get album  controller");

    adminService.getAlbums().then(async (resp)=>{
        res.status(200).json({success: true, data: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

const addAlbum = (req, res) => {
    logger.trace("inside add album  controller");

    adminService.addAlbum(req.body).then(async (resp)=>{
        res.status(200).json({success: true, message: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

const deleteAlbum = (req, res) => {
    let album = req.params.id;
    logger.trace("inside  delete Album controller");
    adminService.deleteAlbum(album).then(async (data)=>{
        res.status(200).json({success:true, message: data});
    })
    .catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}

// Documents
const addDocument = (req, res, next) => {
    logger.trace("inside add document controller");

    adminService.addDocument(req.payload.schoolId, req.body.docType, req.body.docFile, req.body.originalFile)
    .then(async (resp)=>{
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
    deleteSec6Slide,
    addSection5Img,
    addSection2Img,
    addSection3Img,
    addSection4Img,
    addSection7Img,
    addSection6Img,

    getGalleries,
    addGalleries,
    deleteGallery,

    updateCareer,
    updateStudData,
    updateAboutUs,
    updateAboutRM,
    updateAdmData,

    getAlbums,
    addAlbum,
    deleteAlbum,

    addDocument
}