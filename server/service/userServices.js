const logger = require('../../config/logger');
const models = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userLogin = (userCreds, res)=>{
  logger.trace("inside user login",{userCreds});
  return new Promise(async (resolve,reject)=>{
    try{
      let condition = {
        email:userCreds.email,
      }
      let userData = await models.user.findOne(condition,{_id:0,__v:0});
	  logger.trace("Data");
      logger.debug(userData);
      userData = JSON.parse(JSON.stringify(userData));
      if(userData){
        // if(userData.isActive){
        if(userCreds.loginMode === 'social')
        {
          logger.trace("Social Found")
          resolve(userData)	
        }
			
        else if(userData && bcrypt.compareSync(userCreds.password, userData.password)){
          delete userData.password;
          resolve(userData);
        }
        else{
          reject(new Error("Invalid Password"));
        }
      }
      else{
		 if(userCreds.loginMode === 'social')
		 { 
			logger.trace("inside addUser controller");
			  let userData = userCreds;
			  const salt = await bcrypt.genSaltSync(10);
			  const hashPassword = await bcrypt.hashSync(userData.password, salt);
			  userData.password = hashPassword;
			  logger.debug(userData);z
			  addUser(userData).then(data=>{
				let payload = {
				  "email" : data.email,
				  "userId":data._id,
				}
			
				data.token =  jwt.sign(payload,'my_secret_key',{ expiresIn: 60*60*24*30 });
				delete data.password;
				return res.json({"success":true,"data":data});
			  }).catch(err=>{
				  logger.trace(err);
				return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
			  });
		 }
			
        else {
			reject(new Error("Invalid Email ID"));
		} 
			
      }
    }
    catch(err){
      logger.fatal(err);
    }
  });
};


module.exports = {
  userLogin
};