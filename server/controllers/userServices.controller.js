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

const getSchoolData = (req,res,next)=>{

  logger.trace("inside userLogin controller");

  userService.getSchoolData(req.params.id, req.query.param).then(data=>{
    res.status(200).json({success: true, schoolData: data});
  })
  .catch(err => {
	  logger.trace(err);
    res.status(400).json({success: false, message: err});
  });
}

const getAlbums = (req,res,next)=>{

  logger.trace("inside albums controller");

  userService.getAlbums().then(data=>{
    res.status(200).json({success: true, albums: data});
  })
  .catch(err => {
	  logger.trace(err);
    res.status(400).json({success: false, message: err});
  });
}

const getGalleryByAlbum = (req,res,next) => {
  logger.trace("inside images albums controller");

  userService.getGalleryByAlbum(req.params.id).then(data=>{
    res.status(200).json({success: true, data: data});
  })
  .catch(err => {
	  logger.trace(err);
    res.status(400).json({success: false, message: err});
  });
}

const getNewsById = (req,res,next) => {
  logger.trace("inside news data controller");

  userService.getNewsById(req.params.id, req.query.id).then(data=>{
    res.status(200).json({success: true, data: data});
  })
  .catch(err => {
	  logger.trace(err);
    res.status(400).json({success: false, message: err});
  });
}

//enquiry form

const addEnquiry = (req, res) => {
  logger.trace("inside addEnquiry  controller");
  let param = {};

      /* param = {
      
          "name": req.body.name,
          "email": req.body.email,
          "phoneNumber": req.body.phoneNumber,
          "message": req.body.message,
       
      } */


      userService.addEnquiry(req.body).then(async (resp)=>{
      res.status(200).json({success: true, message: resp});
  })
  .catch(err=>{
      logger.fatal(err);
      res.status(err.code?err.code:404).json({success: false, message: err.message});
  });
}
//add  feedback\//enquiry form

const addFeedback = (req, res) => {
  logger.trace("inside addFeedback  controller");
  
  param = {
    
 
}


      userService.addFeedback(req.body).then(async (resp)=>{
      res.status(200).json({success: true, message: resp});
  })
  .catch(err=>{
      logger.fatal(err);
      res.status(err.code?err.code:404).json({success: false, message: err.message});
  });
}

const getEnquiry = (req, res) => {
  logger.trace("inside getEnquiry   controller");

  userService.getEnquiry().then(async (resp)=>{
      res.status(200).json({success: true, data: resp});
  })
  .catch(err=>{
      logger.fatal(err);
      res.status(err.code?err.code:404).json({success: false, message: err.message});
  });
}
// get Enquiry
const getFeedback = (req, res) => {
  logger.trace("inside getEnquiry   controller");

  userService.getFeedback().then(async (resp)=>{
      res.status(200).json({success: true, data: resp});
  })
  .catch(err=>{
      logger.fatal(err);
      res.status(err.code?err.code:404).json({success: false, message: err.message});
  });
}




module.exports = {
  userLogin,
  getSchoolData,
  getAlbums,
  getGalleryByAlbum,
  getNewsById,
  addEnquiry,
  addFeedback,
  getEnquiry,
  getFeedback
  
};