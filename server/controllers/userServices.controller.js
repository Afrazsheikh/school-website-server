const logger = require('../../config/logger');
const userService = require('../service/userServices');
const jwt = require('jsonwebtoken');

const userLogin = (req,res,next)=>{

  logger.trace("inside userLogin controller");

  var userData = req.body;
  userService.userLogin(userData, res).then(data=>{
    logger.debug("data found",data);

    let payload = {
      userId: data._id,
      schoolId: data.schoolId
    }

    const token =  jwt.sign(payload, 'school73(*#$!@^&%vox', { expiresIn: 60*60*24*30 });

    res.status(200).json({success: true, token: token});
  })
  .catch(err => {
	  logger.trace(err);
    res.status(401).json({success: false, message: err});
  });
}

module.exports = {
  userLogin,
};