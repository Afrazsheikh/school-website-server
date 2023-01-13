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
    logger.trace("inside update  controller",banId,bannerObj);
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


const addGallery = (req,res,next)=>{
    logger.trace("inside add addGallery  controller");
    let gallery = req.body.gallery;
  
    userInterfaceService.addGallery(banners).then(async (galleryId)=>{
        logger.info('After adding ....', galleryId);
		
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}


const getGallery = (req,res,next)=>{
    let id = req.params.id
    logger.trace("inside get getGallery by id controller",{id});
    menuService.getGallery(id).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const updateGallery = (req, res) => {
	let galId = req.params.id;
	let galleryObj = req.body;
    logger.trace("inside update  controller",galId,galleryObj);
	userInterfaceService.updateGallery(galId, galleryObj).then(data => {
		res.status(200).json({"success":true, "data":data});
	})
	.catch((err) => {
		logger.fatal(err);
		return res.status(err.code?err.code:404).json({success: false, message: err.message});
	})
}

const deleteGallery = (req,res,next)=>{
    let id = req.params.id;
    logger.trace("inside  deleteGallery controller",id);
    userInterfaceService.deleteGallery(id).then(async (data)=>{
     
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}



const addNews = (req,res,next)=>{
    logger.trace("inside add addNews  controller");
    let news = req.body.news;
  
    userInterfaceService.addNews(news).then(async (newsId)=>{
        logger.info('After adding  news....', newsId);
		
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}


const getNews = (req,res,next)=>{
    let id = req.params.id
    logger.trace("inside get getNews by id controller",{id});
    menuService.getNews(id).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const updateNews = (req, res) => {
	let newsId = req.params.id;
	let newsObj = req.body;
    logger.trace("inside update  controller",newsId,newsObj);
	userInterfaceService.updateNews(newsId, newsObj).then(data => {
		res.status(200).json({"success":true, "data":data});
	})
	.catch((err) => {
		logger.fatal(err);
		return res.status(err.code?err.code:404).json({success: false, message: err.message});
	})
}

const deleteNews = (req,res,next)=>{
    let id = req.params.id;
    logger.trace("inside  deleteNews controller",id);
    userInterfaceService.deleteNews(id).then(async (data)=>{
     
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
    deleteBanner,

    addGallery,
    getGallery,
    updateGallery,
    deleteGallery,

    addNews,
    getNews,
    updateNews,
    deleteNews



}