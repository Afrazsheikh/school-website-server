const express = require('express');
const validate = require('express-validation');
// const activityLogger = require('../middlewares/activityLogger')
const controller = require('../controllers/userServices.controller');
const router = express.Router();


router.route('/login').post(validate(login),controller.userLogin);
//Add routes here

module.exports = router;

