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

const updateSection = (id, section, secData) => {
    return new Promise(async (resolve, reject) => {
        try {
          
            
            let sec = await models.school.findOneAndUpdate(
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



const addGallery = (gallery) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside add gallery service",{gallery});
            let gall = await models.GalleryAdd.insertMany(
                [gallery]
            );
			
            return resolve(gall[0]._id);
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

const getGallery = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get getGallery by id service");
            let gall = await models.GalleryAdd.findOne(
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

const updateGallery= (_id,galleryObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside update updateGallery service");
            let banner = await models.galleryAdd.findOneAndUpdate(
                {_id},
                galleryObj,
                {returnOriginal: false}
            );            
            return resolve(banner);
        }
        catch (err) {
            logger.fatal(err);
            if(err.code == 11000){
                return reject({ code:422, message: "uGallery name already exists!!!" });
            }
            reject({ code:401, message: err.message });
        }
    })
}

const deleteGallery = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside deleteGallery  service");
            let gallery = await models.galleryAdd.deleteOne(
                {_id},
            );     
            logger.debug(gallery);
            if(!gallery.deletedCount){
                return reject({code:422, message:"gallery not found"});
            }       
            return resolve("gallery deleted successfully...");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}



const addNews = (news) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside add news service",{gallery});
            let nws = await models.newsAdd.insertMany(
                [news]
            );
			
            return resolve(nws[0]._id);
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

const getNews = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get getNews by id service");
            let nws = await models.newsAdd.findOne(
                {_id},
                {
                    __v:0
                }
            );
            resolve(newsAdd);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

const updateNews= (_id,newsObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside  updatenews service");
            let news = await models.newsAdd.findOneAndUpdate(
                {_id},
                newsObj,
                {returnOriginal: false}
            );            
            return resolve(news);
        }
        catch (err) {
            logger.fatal(err);
            if(err.code == 11000){
                return reject({ code:422, message: "news  already exists!!!" });
            }
            reject({ code:401, message: err.message });
        }
    })
}

const deleteNews = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside deletenews  service");
            let  news = await models.newsAdd.deleteOne(
                {_id},
            );     
            logger.debug(news);
            if(!gallery.deletedCount){
                return reject({code:422, message:"news not found"});
            }       
            return resolve("news deleted successfully...");
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
    updateSection,
    deleteBanner,

    addGallery,
    getGallery,
    updateGallery,
    deleteGallery,

    addNews,
    getNews,
    updateNews,
    deleteNews,
}