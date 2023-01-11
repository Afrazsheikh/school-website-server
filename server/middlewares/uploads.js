const multer = require("multer");
const crypto = require('crypto');
const logger = require('../../config/logger');

const imageFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb("Please upload only image file.", false);
  }
};

const storage = multer.memoryStorage();
var uploadFile = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFile;