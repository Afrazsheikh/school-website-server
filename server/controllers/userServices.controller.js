const logger = require('../../config/logger');
const userService = require('../service/userServices');
const jwt = require('jsonwebtoken');

const userLogin = (req,res,next)=>{
  logger.trace("inside userLogin controller");
  var userData = req.body;
  userService.userLogin(userData, res).then(data=>{
    logger.debug("data found",data);
    let payload = {
      "email" : data.email,
      "userId":data._id,
    }
    data.token =  jwt.sign(payload,'my_secret_key',{ expiresIn: 60*60*24*30 });
    delete data.password;
    res.json({"success":true, "data":data});
  }).catch(err=>{
	  logger.trace(err.message);
    return res.status(200).json({"success":false,"message":err.message});
  });
}

module.exports = {
  userLogin,
};