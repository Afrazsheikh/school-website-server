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
router.route('/deleteSection4/:id').delete(authorize, adminController.deleteSec4Slide);
router.route('/deleteSection5/:id').delete(authorize, adminController.deleteSec5Slide);
router.route('/deleteSection6/:id').delete(authorize, adminController.deleteSec6Slide);

router.route('/addSection2Img').post(authorize, uploads.uploadSection2Img.single('file'), adminController.addSection2Img);
router.route('/addSection3Img').post(authorize, uploads.uploadSection2Img.single('file'), adminController.addSection3Img);
router.route('/addSection4Img').post(authorize, uploads.uploadSection2Img.single('file'), adminController.addSection4Img);
router.route('/addSection5Img').post(authorize, uploads.uploadSection2Img.single('file'), adminController.addSection5Img);
router.route('/addSection6Img').post(authorize, uploads.uploadSection2Img.single('file'), adminController.addSection5Img);

router.route('/addSection7Img').post(authorize, uploads.uploadSection2Img.single('file'), adminController.addSection7Img);
router.route('/addGallery').post(authorize, uploads.uploadGallery.any('file'), adminController.addGalleries);
router.route('/deleteGallery/:id').delete(authorize, adminController.deleteGallery);

// Menus Apis
// Careers
router.route('/updateCareer').post(authorize, uploads.uploadSection2Img.single('file'), adminController.updateCareer);
router.route('/updateAdmData').post(authorize,  adminController.updateAdmData);

router.route('/updateAboutUSRM').post(authorize, uploads.uploadSection2Img.single('file'), adminController.updateAboutRM);

// Student Corner
router.route('/updateStudData').post(authorize, uploads.uploadSection2Img.single('file'), adminController.updateStudData);
router.route('/updateAboutUs').post(authorize, uploads.uploadSection2Img.single('file'), adminController.updateAboutUs);


// Gallery Album
router.route('/getAlbums').get(authorize, adminController.getAlbums);
router.route('/getGalleries').get(authorize, adminController.getGalleries);
router.route('/addAlbum').post(authorize, adminController.addAlbum);
router.route('/deleteAlbum/:id').delete(authorize, adminController.deleteAlbum);

// Add Documents
router.route('/addDocument').post(authorize, uploads.uploadDoc.single('file'), adminController.addDocument);


//add enquiry

router.route('/getEnquiry').get(authorize, adminController.getEnquiry);


//feedback

router.route('/getFeedback').get(authorize, adminController.getFeedback);



module.exports = router;

