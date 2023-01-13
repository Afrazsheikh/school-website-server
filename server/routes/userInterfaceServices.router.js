const express = require('express');
const validate = require('express-validation');
// const activityLogger = require('../middlewares/activityLogger')
const controller = require('../controllers/userServices.controller');
const bannersService = require('../controllers/userInterfaceServices.controller')
const router = express.Router();


router.route('/login').post(controller.userLogin);

router.route('/addBanners').post(bannersService.addBanners);
router.route('/getBanner').get(bannersService.getBanner);
router.route('/updateBanner').put(bannersService.updateBanner);
router.route('/deleteBanner').delete(bannersService.deleteBanner);
//Gallery
router.route('/addGallery').post(bannersService.addGallery);
router.route('/getGallery').get(bannersService.getGallery);
router.route('/updateGAllery').put(bannersService.updateGallery);
router.route('/deleteGallery').delete(bannersService.deleteGallery);
//News
router.route('/addNews').post(bannersService.addNews);
router.route('/getNews').get(bannersService.getNews);
router.route('/updateNews').put(bannersService.updateNews);
router.route('/deleteNews').delete(bannersService.deleteNews);






//Add routes here

module.exports = router;

