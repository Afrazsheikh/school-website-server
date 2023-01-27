const logger = require('../../config/logger');
const models = require('../../models');
const fs = require('fs');

const addLogo = (id, logoFile) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside add logo service",{id, logoFile});
            await models.school.updateOne(
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

const getSettings = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get settings by id service");
            let school = await models.school.findOne(
                {_id: id},
                {logoImage: 1, address: 1, email: 1, name: 1, phone: 1}
            );

            resolve(school);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:400, message: err.message });
        }
    })
}

const updateSettings = (id, params) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside add logo service",{id, params});
            await models.school.updateOne(
                {_id: id},
                {$set: params}
            );
            
            return resolve("Settings updated successfully");
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
            let sections = await models.school.findOne(
                {_id: id},
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
        try 
        {
            if(section == "section1")
            {   
                let sec = await models.school.updateOne(
                    {_id: id},
                    {$push: {[section]: secData}}
                );
                
                return resolve("Slide added successfully");
            }
            else if(section == "section2" || "section3")
            {
                let sec = await models.school.updateOne(
                    {_id: id},
                    {$set: {[section]: secData}}
                );
                
                return resolve("Section updated successfully");
            }
            else {
                return resolve("Section updated successfully");
            }

        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
		}
	})
}

const updateSection = (id, section, secData) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            if(section == 'section1')
            {
                let sec = await models.school.findOneAndUpdate(
                    {_id: id, "section1._id": secData.id},
                    {$set: {"section1.$.title": secData.title}}
                );
                
                return resolve("Slide updated successfully");
            }
            else {
                return resolve("Slide updated successfully");
            }
            
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
		}
	})
}

const deleteSlide = (id, slideId) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside delete slide service");
            let school = await models.school.findOne(
                {_id: id},
                {section1: 1}
            );     
            
            const index = school.section1.findIndex((sec) => sec._id == slideId);
            if(index != -1) 
            {
                const deletedSlide = school.section1[index];
                school.section1.splice(index, 1);
                await models.school.updateOne(
                    {_id: id},
                    {$set: {section1: school.section1}}
                )
                
                fs.unlink(__dirname + '/../images/' + deletedSlide.slideImg1, (err) => {});
                fs.unlink(__dirname + '/../images/' + deletedSlide.slideImg2, (err) => {});
            }
     
            return resolve("Slide deleted successfully...");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

const addSection2Img = (id, param, imgFile) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside add section2 img service",{id, param});
            if(param == 'bottom1') {
                await models.school.updateOne(
                    {_id: id},
                    {$set: {"section2.bottomImage1": imgFile}}
                );
            }
            else if(param == 'bottom2') {
                await models.school.updateOne(
                    {_id: id},
                    {$set: {"section2.bottomImage2": imgFile}}
                );
            }
            else {
                await models.school.updateOne(
                    {_id: id},
                    {$set: {"section2.bottomImage3": imgFile}}
                );
            }
            
            return resolve("Image updated successfully");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 400, message: err.message });
		}
	})
}

const addSection3Img = (id, param, imgFile) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside add section3 img service",{id, param});
            if(param == 'img') {
                await models.school.updateOne(
                    {_id: id},
                    {$set: {"section3.img": imgFile}}
                );
            }
            else {
                await models.school.updateOne(
                    {_id: id},
                    {$set: {"section3.videoThumb": imgFile}}
                );
            }
            
            return resolve("Image updated successfully");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 400, message: err.message });
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
    getSettings,
    updateSettings,
    getSections,
    addSection,
    updateSection,
    deleteSlide,
    addSection2Img,
    addSection3Img,

    addGallery,
    getGallery,
    updateGallery,
    deleteGallery,

    addNews,
    getNews,
    updateNews,
    deleteNews,
}