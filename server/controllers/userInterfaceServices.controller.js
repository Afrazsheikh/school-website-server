const logger = require('../../config/logger');
const userInterfaceService = require('../service/userInterfaceServices');



const addBanners = (req,res,next)=>{
    logger.trace("inside add addBannerts  controller");
    let banners = req.body.banners;
  
    userInterfaceService.addBanners(banners).then(async (bannerId)=>{
        logger.info('After adding restuarnt....', bannerId);
		
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
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

const getBanner = (req,res,next)=>{
    let id = req.params.id
    logger.trace("inside get getBanner by id controller",{id});
    menuService.getBanner(id).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}




module.exports = {
    addBanners,
    updateBanner,
    deleteBanner,
    getBanner
}