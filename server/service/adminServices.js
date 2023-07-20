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
            if(section == "section1" || section == "section4" ||  section == "section5" || section == "section6")
            {   
                let sec = await models.school.updateOne(
                    {_id: id},
                    {$push: {[section]: secData}}
                );
                              
                return resolve("Slide added successfully");
            }
            else if(section == "section2" || section == "section3" || section == "section7")
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
            }
            else if(section == 'section5') { 
                let sec =  await models.school.findOneAndUpdate(
                    {_id: id, "section5._id": secData.id},
                    {$set: {
                        "section5.$.heading": secData.heading,
                        "section5.$.newsDate": secData.newsDate,
                    }},
                )

                return resolve("News updated successfully");
            }
            else if(section == 'section6') {
                let sec =  await models.school.findOneAndUpdate(
                    {_id: id, "section6._id": secData.id},
                    {$set: {
                        "section6.$.title": secData.title,
                        "section6.$.subTitle": secData.subTitle,
                        "section6.$.academicYear.from": secData.academicYear.from,
                        "section6.$.academicYear.to": secData.academicYear.to
                    }},
                )

                return resolve("News updated successfully");
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
            
            const index = school.section5.findIndex((sec) => sec._id == slideId);
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

const deleteSec6Slide = (id, slideId) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside delete slide service");
            let school = await models.school.findOne(
                {_id: id},
                {section6: 1}
            );     
            
            const index = school.section6.findIndex((sec) => sec._id == slideId);
            if(index != -1) 
            {
                const deletedSlide = school.section6[index];
                school.section6.splice(index, 1);
                await models.school.updateOne(
                    {_id: id},
                    {$set: {section6: school.section6}}
                )
                
                fs.unlink(__dirname + '/../images/' + deletedSlide.coverImage, (err) => {});
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

const addSection6Img = (id, param, imgFile) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside add section6 img service",{id, param});
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

const getGalleries = (album) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside get gallery service");
            let images = await models.album.findOne(
                {albumName: album},
                {images: 1, _id: 0}
            );     
     
            return resolve(images);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    }) 
}

const addGalleries = (albumName, galleries) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside add gallery service");
            let album = await models.album.updateOne(
                {albumName: albumName},
                {$push: {images: galleries}}
            );     
     
            return resolve("Images added successfully...");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

const deleteGallery = (albumName, fileId) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside delete gallery service");
            let album = await models.album.findOne(
                {albumName: albumName},
                {images: 1}
            );     
            
            const index = album.images.findIndex((gall) => gall == fileId);
            if(index != -1) 
            {
                const deletedImg = album.images[index];
                album.images.splice(index, 1);
                await models.album.updateOne(
                    {albumName: albumName},
                    {$set: {images: album.images}}
                )
                
                fs.unlink(__dirname + '/../images/' + deletedImg, (err) => {});
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

const updateCareer = (id, postData) => {
    return new Promise(async (resolve, reject) => {
        try 
        {  
            if(postData.imgType == 'img') {
                let sec = await models.school.findOneAndUpdate(
                    {_id: id},
                    {$set: {"careers.img": postData.imgFile}});    
            }
            else {
                let sec = await models.school.findOneAndUpdate(
                    {_id: id},
                    {$set: {"careers.mainTitle": postData.mainTitle, 
                        "careers.description": postData.description}}
                );
            }  
            
            return resolve("Career updated successfully");   
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:400, message: err.message });
		}
	})
}

// aboutUs read mroe

const updateAboutUSRM = (id, postData) => {
    return new Promise(async (resolve, reject) => {
        try 
        {  
            if(postData.imgType == 'img') {
                let sec = await models.school.findOneAndUpdate(
                    {_id: id},
                    {$set: {"AboutUSRM.img": postData.imgFile}});    
            }
            else {
                let sec = await models.school.findOneAndUpdate(
                    {_id: id},
                    {$set: {"AboutUSRM.message": postData.message, 
                        "AboutUSRM.description": postData.description}}
                );
            }  
            
            return resolve("Career updated successfully");   
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:400, message: err.message });
		}
	})
}


const updateStudData = (id, param) => {
    return new Promise(async (resolve, reject) => {
        try 
        {   
            let sec = await models.school.findOneAndUpdate(
                {_id: id},
                {$set: param});    
           
            return resolve("Student Corner updated successfully");   
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:400, message: err.message });
		}
	})
}
const updateAboutUs = (id, param) => {
  console.log("id=================>", id, param, 'param================');
    return new Promise(async (resolve, reject) => {
        try 
        {   
            let sec = await models.school.findOneAndUpdate(
                {_id: id},
                {$set: param});    
           
            return resolve("Student Abouts updated successfully");   
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:400, message: err.message });
		}
	})
}
const updateAdmData = (id, param) => {
    return new Promise(async (resolve, reject) => {
        try 
        {   
            let sec = await models.school.findOneAndUpdate(
                {_id: id},
                {$set: param});    
           
            return resolve("Student addmissin updated successfully");   
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:400, message: err.message });
		}
	})
}

const getAlbums = () => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside get albums service");
            let albums = await models.album.find({});            
            return resolve(albums);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 400, message: err.message });
		}
	})
}

const addAlbum = (param) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            let name = param.fromYear + '-' + param.toYear;
            logger.trace("inside add album");
            await models.album.insertMany({albumName: name});   
            
            resolve("Album added successfully");
        }
        catch (err) {
            logger.fatal(err);
            if(err.code == 11000) {
                reject({ code: 400, message: "Album is already added." });
            }
            else {
                reject({ code: 400, message: err.message });
            }
		}
	})
}

const deleteAlbum = (albumName) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside delete album service");
            let album = await models.album.findOneAndDelete(
                {albumName: albumName},
            );     
            
            if(album) {
                album.images.forEach(img => {
                    fs.unlink(__dirname + '/../images/' + img, (err) => {});
                });
            }
     
            return resolve("Image deleted successfully...");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

// Documents
const addDocument = (id, docType, docFile, originalFile) => {
    return new Promise(async (resolve, reject) => {
        try 
        {
            logger.trace("inside add docs service",{id, docFile});
            await models.school.updateOne(
                {_id: id},
                {$set: {[`documents.${[docType]}`]: docFile}}
            );
            
            fs.unlink(__dirname + '/../documents/' + originalFile, (err) => {});
            
            return resolve("Document added successfully");
        }
        catch (err) {
            logger.fatal(err);
            reject({ code: 400, message: err.message });
		}
	})
}

// const addFacility = async (facilityData) => {
//     try {
//       const newFacility = new FacilityAdd(facilityData);
//       const savedFacility = await newFacility.save();
//       return savedFacility;
//     } catch (error) {
//       throw error;
//     }
//   };
  const addFacility = (id, param) => {
    return new Promise(async (resolve, reject) => {
        try 
        {   
            let sec = await models.school.findOneAndUpdate(
                {_id: id},
                {$set: param});    
           
            return resolve("Facility updated successfully");   
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:400, message: err.message });
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
    deleteSec6Slide,
    addSection2Img,
    addSection3Img,
    addSection4Img,
    addSection5Img,
    addSection7Img,
    getGalleries,
    addGalleries,
    deleteGallery,

    updateCareer,
    updateStudData,
    updateAboutUs,
    updateAdmData,

    getAlbums,
    addAlbum,
    deleteAlbum,

    addDocument,
    addFacility



    


}