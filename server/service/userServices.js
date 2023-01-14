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


module.exports = {
  userLogin
};