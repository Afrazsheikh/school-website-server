const express = require('express');
const validate = require('express-validation');
// const activityLogger = require('../middlewares/activityLogger')
const controller = require('../controllers/userServices.controller');
const bannersService = require('../controllers/userInterfaceServices.controller')
const router = express.Router();


router.route('/login').post(controller.userLogin);
router.route('/addBanners').post(controller.addBanners);
router.route('/updateBanner').put(controller.updateBanner);
router.route('/deleteBanner').delete(controller.deleteBanner);
router.route('/getBanner').get(controller.getBanner);



//Add routes here

module.exports = router;

