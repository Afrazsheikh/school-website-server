const express = require('express');
const validate = require('express-validation');
// const activityLogger = require('../middlewares/activityLogger')
const controller = require('../controllers/userServices.controller');
const router = express.Router();


router.route('/login').post(controller.userLogin);
//Add routes here
router.route('/getSchoolData/:id').get(controller.getSchoolData);
router.route('/getAlbums').get(controller.getAlbums);
router.route('/getGalleryByAlbum/:id').get(controller.getGalleryByAlbum);
router.route('/getNewsById/:id').get(controller.getNewsById);
router.route('/addEnquiry').post(controller.addEnquiry);
router.route('/addfeedback').post(controller.addFeedback);
router.route('/getEnquiry').get( controller.getEnquiry);
module.exports = router;

