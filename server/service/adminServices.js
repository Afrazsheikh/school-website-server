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
            if(section == "section1" || "section4" ||  "section5" || "galleries")
            {   
                let sec = await models.school.updateOne(
                    {_id: id},
                    {$push: {[section]: secData}}
                );
                
                return resolve("Slide added successfully");
            }
            else if(section == "section2" || "section3" || "section7")
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
            else if(section == 'section4') {
                let sec = await models.school.findOneAndUpdate(
                    {_id: id, "section4._id": secData.id},
                    {$set: {
                        "section4.$.title": secData.title,
                        "section4.$.description": secData.description
                    }},
                );

                return resolve("Slide updated successfully");
            }else if(section == 'section5'){ 
                let sec =  await models.school.findOneAndUpdate(
                    {_id: id, "section5._id": secData.id},
                    {$set: {
                        "section5.$.heading": secData.heading,
                        "section5.$.newsDate": secData.newsDate,
                    }},
                )

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

const deleteSec4Slide = (id, slideId) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside delete slide service");
            let school = await models.school.findOne(
                {_id: id},
                {section4: 1}
            );     
            
            const index = school.section4.findIndex((sec) => sec._id == slideId);
            if(index != -1) 
            {
                const deletedSlide = school.section4[index];
                school.section4.splice(index, 1);
                await models.school.updateOne(
                    {_id: id},
                    {$set: {section4: school.section4}}
                )
                
                fs.unlink(__dirname + '/../images/' + deletedSlide.img, (err) => {});
            }
     
            return resolve("Slide deleted successfully...");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}


const deleteSec5Slide = (id, slideId) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside delete slide service");
            let school = await models.school.findOne(
                {_id: id},
                {section5: 1}
            );     
            
            const index = school.section4.findIndex((sec) => sec._id == slideId);
            if(index != -1) 
            {
                const deletedSlide = school.section5[index];
                school.section5.splice(index, 1);
                await models.school.updateOne(
                    {_id: id},
                    {$set: {section5: school.section5}}
                )
                
                fs.unlink(__dirname + '/../images/' + deletedSlide.img, (err) => {});
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

const addSection4Img = (id, param, imgFile) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside add section4 img service",{id, param});
            if(param == 'img') {
                await models.school.updateOne(
                    {_id: id},
                    {$set: {"section4.img": imgFile}}
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

const addSection5Img = (id, param, imgFile) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside add section4 img service",{id, param});
            if(param == 'img') {
                await models.school.updateOne(
                    {_id: id},
                    {$set: {"section5.img": imgFile}}
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

const deleteGallery = (id, fileId) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside delete gallery service");
            let school = await models.school.findOne(
                {_id: id},
                {galleries: 1}
            );     
            
            const index = school.galleries.findIndex((gall) => gall._id == fileId);
            if(index != -1) 
            {
                const deletedImg = school.galleries[index];
                school.galleries.splice(index, 1);
                await models.school.updateOne(
                    {_id: id},
                    {$set: {galleries: school.galleries}}
                )
                
                fs.unlink(__dirname + '/../images/' + deletedImg.img, (err) => {});
            }
     
            return resolve("Image deleted successfully...");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}


const addSection7Img = (id, param, imgFile) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside add section2 img service",{id, param});
            if(param == 'topLeft') {
                await models.school.updateOne(
                    {_id: id},
                    {$set: {"section7.topLeftImage": imgFile}}
                );
            }
            else if(param == 'topRight') {
                await models.school.updateOne(
                    {_id: id},
                    {$set: {"section7.topRightImage": imgFile}}
                );
            }
            else if(param == 'center') {
                await models.school.updateOne(
                    {_id: id},
                    {$set: {"section7.centerImage": imgFile}}
                );
            }
            else if(param == 'bottomLeft') {
                await models.school.updateOne(
                    {_id: id},
                    {$set: {"section7.bottomLeftImage": imgFile}}
                );
            }
            else {
                await models.school.updateOne(
                    {_id: id},
                    {$set: {"section7.bottomRightImage": imgFile}}
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
    deleteSec4Slide,
    deleteSec5Slide,
    addSection2Img,
    addSection3Img,
    addSection4Img,
    addSection5Img,
    addSection7Img,

    addGallery,
    getGallery,
    updateGallery,
    deleteGallery,

    addNews,
    getNews,
    updateNews,
    deleteNews,
}