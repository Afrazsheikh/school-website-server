const logger = require('../../config/logger');
const models = require('../../models');
const moment = require('moment');
const { param } = require('../routes/userServices.router');




const addBanners = (banners) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside add banners service",{banners});
            let bann = await models.BannersAdd.insertMany(
                [banners]
            );
			
            return resolve(bann[0]._id);
        }
        catch (err) {
            logger.fatal(err);
            if(err.code == 11000){
                return reject({ code:422, message: "duplicate entry found" });
			}
            reject({ code:401, message: err.message });
		}
	})
}

const updateBanner= (_id,bannerObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside update BannersAdd service");
            let banner = await models.BannersAdd.findOneAndUpdate(
                {_id},
                bannerObj,
                {returnOriginal: false}
            );            
            return resolve(banner);
        }
        catch (err) {
            logger.fatal(err);
            if(err.code == 11000){
                return reject({ code:422, message: "Banner name already exists!!!" });
            }
            reject({ code:401, message: err.message });
        }
    })
}

const deleteBanner = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside disable banner service");
            let banner = await models.BannersAdd.deleteOne(
                {_id},
            );     
            logger.debug(banner);
            if(!banner.deletedCount){
                return reject({code:422, message:"banner not found"});
            }       
            return resolve("banner deleted successfully...");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}


const getBanner = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get getBanner by id service");
            let banner = await models.BannersAdd.findOne(
                {_id},
                {
                    __v:0
                }
            );
            resolve(BannersAdd);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}


module.exports  = {
    addBanners,
    updateBanner,
    deleteBanner,
    getBanner



}