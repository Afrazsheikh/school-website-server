const multer = require("multer");
const crypto = require('crypto');
const logger = require('../../config/logger');
const path = require('path');
const { ObjectId } = require("mongodb");
let slides = [], galleries = [];

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
    req.body.logoFile = file.originalname; 
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
    const filename = "slide" + id + path.extname(file.originalname);
    slides.push({
      secId: id,
      slideFile: filename
    });
    req.body.slides = slides; 
    cb(null, filename);
  },
});

const editStorageSection = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname+"/../../server/images");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname); 
    cb(null, file.originalname);
  },
});

const storageSection2Img = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname+"/../../server/images");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    req.body.imgFile = file.originalname;
    cb(null, req.body.imgFile);
  },
});

const storageGallery = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname+"/../../server/images");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    const id = new ObjectId();
    const filename = "gallery" + id + path.extname(file.originalname);
    galleries.push(filename);
    req.body.galleries = galleries; 
    cb(null, filename);
  },
});


var uploadLogo = multer({ storage: storageLogo, fileFilter: imageFilter });
var uploadSecImg = multer({ storage: storageSection, fileFilter: imageFilter });
var editSecImg = multer({ storage: editStorageSection, fileFilter: imageFilter });
var uploadSection2Img = multer({ storage: storageSection2Img, fileFilter: imageFilter });
var uploadGallery = multer({ storage: storageGallery, fileFilter: imageFilter });

module.exports = {uploadLogo, uploadSecImg, editSecImg, uploadSection2Img, uploadGallery};