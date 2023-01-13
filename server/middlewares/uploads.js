const multer = require("multer");
const crypto = require('crypto');
const logger = require('../../config/logger');
const path = require('path');
const { ObjectId } = require("mongodb");

const imageFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb("Please upload only image file.", false);
  }
};

const storageLogo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname+"/../../server/images");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    req.body.logoFile = "header-logo" + path.extname(file.originalname); 
    cb(null, req.body.logoFile);
  },
});

const storageSection = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname+"/../../server/images");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    const id = new ObjectId();
    req.body.secId = id;
    req.body.slide1 = "slide1" + id + path.extname(file.originalname); 
    cb(null, req.body.secImg);
  },
});


var uploadLogo = multer({ storage: storageLogo, fileFilter: imageFilter });
var uploadSecImg = multer({ storage: storageSection, fileFilter: imageFilter });

module.exports = uploadLogo;