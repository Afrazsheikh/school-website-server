const logger = require('../../config/logger');
const models = require('../../models');


const addLogo = (id, logoFile) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside add logo service",{id, logoFile});
            let bann = await models.school.updateOne(
                {_id: id},
                {$set: {logoImage: logoFile}}
            );
            
            return resolve("Image updated successfully");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 400, message: err.message });
		}
	})
}

const getSections = (id, secType) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get sections by id service");
            let sections = await models.school.find(
                {_id: _id},
                secType
            );

            resolve(sections);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:400, message: err.message });
        }
    })
}

const addSection = (id, section, secData) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside add banners service",{banners});
            
            let sec = await models.school.updateOne(
                {_id: id},
                {$push: {[section]: secData}}
            );
			
            return resolve("Section added successfully");
        }
        catch (err) {
            logger.fatal(err);
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



module.exports  = {
    addLogo,
    getSections,
    addSection,
    updateBanner,
    deleteBanner
}