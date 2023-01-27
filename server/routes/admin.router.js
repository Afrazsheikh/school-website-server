const express = require('express');
const validate = require('express-validation');
// const activityLogger = require('../middlewares/activityLogger')
const userController = require('../controllers/userServices.controller');
const adminController = require('../controllers/adminServices.controller');
const router = express.Router();
const authorize = require('../middlewares/secureRoutes');
const uploads = require('../middlewares/uploads');


router.route('/login').post(userController.userLogin);

// Logo
router.route('/addLogo').post(authorize, uploads.uploadLogo.single('file'), adminController.addLogo);
router.route('/getSettings').get(authorize, adminController.getSettings);
router.route('/updateSettings').post(authorize, adminController.updateSettings);

// Sections
router.route('/getSection').get(authorize, adminController.getSections);
router.route('/addSection').post(authorize, uploads.uploadSecImg.any('file'), adminController.addSection);
router.route('/updateSection').put(authorize, uploads.editSecImg.any('file'), adminController.updateSection);
router.route('/deleteSection/:id').delete(authorize, adminController.deleteSlide);
router.route('/addSection2Img').post(authorize, uploads.uploadSection2Img.single('file'), adminController.addSection2Img);
router.route('/addSection3Img').post(authorize, uploads.uploadSection2Img.single('file'), adminController.addSection3Img);

//Gallery
/* router.route('/addGallery').post(bannersService.addGallery);
router.route('/getGallery').get(bannersService.getGallery);
router.route('/updateGAllery').put(bannersService.updateGallery);
router.route('/deleteGallery').delete(bannersService.deleteGallery); */

//News
/* router.route('/addNews').post(bannersService.addNews);
router.route('/getNews').get(bannersService.getNews);
router.route('/updateNews').put(bannersService.updateNews);
router.route('/deleteNews').delete(bannersService.deleteNews); */


module.exports = router;

