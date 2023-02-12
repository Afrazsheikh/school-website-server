const logger = require('../../config/logger');
const models = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userLogin = (userCreds, res)=>{
  logger.trace("inside user login",{userCreds});

  return new Promise(async (resolve, reject)=>{
    try
    {
      let condition = {
        email:userCreds.email,
      }

      let userData = await models.admin.findOne(condition,{_id: 1, __v:0});
      let school = await models.school.findOne({}, {_id: 1, __v: 0});
	    
      logger.trace("Data");
      logger.debug(userData);

      if(userData)
      {
        if(userData && userCreds.password == userData.password) {
          delete userData.password;
          userData["schoolId"] = school._id;
          resolve(userData);
        }
        else {
          reject("Invalid Password");
        }
      }
      else {
			  reject("Invalid Email Id");
		  } 
    }
    catch(err){
      logger.fatal(err);
      reject("Unable to Authenticate");
    }
  });
};

const getSchoolData = (id, param = null)=>{
  logger.trace("inside get school data");

  return new Promise(async (resolve, reject)=>{
    try
    {
      let schoolData;

      if(param) {
        schoolData = await models.school.findOne({_id: id}, {[param]: 1});
      }
      else {
			  schoolData = await models.school.findOne({_id: id}, {_id: 0, __v: 0});
		  }
      
      resolve(schoolData);
    }
    catch(err){
      logger.fatal(err);
      reject("Unable to fetch data");
    }
  });
};

const getAlbums = ()=>{
  logger.trace("inside get albums data");

  return new Promise(async (resolve, reject)=>{
    try
    {
      let albums;
      
      albums = await models.album.find({});
      
      resolve(albums);
    }
    catch(err){
      logger.fatal(err);
      reject("Unable to fetch data");
    }
  });
};

const getGalleryByAlbum = (name) => {
  logger.trace("inside get images album data");

  return new Promise(async (resolve, reject)=>{
    try
    {
      let images = [];
      
      images = await models.album.findOne({albumName: name}, {images: 1});
      
      resolve(images);
    }
    catch(err){
      logger.fatal(err);
      reject("Unable to fetch data");
    }
  });
}

const getNewsById = (schoolId, id) => {
  logger.trace("inside get news data");

  return new Promise(async (resolve, reject)=>{
    try
    {
      let newsData = [];
      
      newsData = await models.school.findOne({_id: schoolId, "section5._id": id}, {section5: 1});

      let index = newsData.section5.findIndex(news => news._id == id);
      if(index != -1) {
        resolve(newsData.section5[index]);
      }
      else {
        resolve({});
      }
    }
    catch(err){
      logger.fatal(err);
      reject("Unable to fetch data");
    }
  });
}



//add enquiry form
const addEnquiry = (param) => {
  return new Promise(async (resolve, reject) => {
      try 
      {   
          let sec = await models.form.insertMany(
           
              param);    
         
          return resolve("Student addEnquiry updated successfully");   
      }
      catch (err) {
          logger.fatal(err);
          reject({ code:400, message: err.message });
  }
})
}
// feedback

const addFeedback = (param) => {
  return new Promise(async (resolve, reject) => {
      try 
      {   
          let sec = await models.feedbackForm.insertMany(
           
              {$set: param});    
         
          return resolve(" addFeedback updated successfully");   
      }
      catch (err) {
          logger.fatal(err);
          reject({ code:400, message: err.message });
  }
})
}
//get enquiry
const getEnquiry = () => {
  return new Promise(async (resolve, reject) => {
      try 
      {
          logger.trace("inside getEnquiry service");
          let enquiry = await models.form.find({});            
          return resolve(enquiry);
      }
      catch (err) {
          logger.fatal(err);
          reject({ code: 400, message: err.message });
  }
})
}


module.exports = {
  userLogin,
  getSchoolData,
  getAlbums,
  getGalleryByAlbum,
  getNewsById,
  addEnquiry,
  addFeedback,getEnquiry
};