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


module.exports = {
  userLogin,
  getSchoolData,
  getAlbums,
  getGalleryByAlbum
};