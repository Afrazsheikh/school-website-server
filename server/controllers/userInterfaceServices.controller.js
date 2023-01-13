const logger = require('../../config/logger');
const userInterfaceService = require('../service/userInterfaceServices');


const addLogo = (req,res,next)=>{
    logger.trace("inside add Logo controller");

    userInterfaceService.addBanners(req.payload.id, req.logoFile).then(async (resp)=>{
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
    
    userInterfaceService.getSections(secType).then(resp => {
        res.status(200).json({success: true, data: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}


const addSection = (req, res, next)=>{
    logger.trace("inside add addBannerts  controller");
    let secType = req.body.secType;
    let secData = {}, section = "";

    if(secType == "sec1") 
    {
        section = "section1";
        secData["id"] = req.body.secId;
        secData["title"] = req.body.title;
        secData["slideImg1"] = req.body.slide1;
    }
  
    userInterfaceService.addSection(req.payload.schoolId, section, secData).then(async (resp)=>{
        logger.info('After adding section....', resp);
        res.status(200).json({success: true, message: resp});
    })
    .catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({success: false, message: err.message});
    });
}


const updateBanner = (req, res) => {
	let banId = req.params.id;
	let bannerObj = req.body;
    logger.trace("inside update topping controller",banId,banner);
	userInterfaceService.updatebanner(banId, bannerObj).then(data => {
		res.status(200).json({"success":true, "data":data});
	})
	.catch((err) => {
		logger.fatal(err);
		return res.status(err.code?err.code:404).json({success: false, message: err.message});
	})
}

const deleteBanner = (req,res,next)=>{
    let id = req.params.id;
    logger.trace("inside  deleteBanner controller",id);
    userInterfaceService.deleteBanner(id).then(async (data)=>{
     
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}



module.exports = {
    addLogo,
    getSections,
    addSection,
    updateBanner,
    deleteBanner
}