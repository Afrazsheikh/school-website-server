const express = require('express');
const validate = require('express-validation');
// const activityLogger = require('../middlewares/activityLogger')
const userController = require('../controllers/userServices.controller');
const schoolController = require('../controllers/userInterfaceServices.controller')
const router = express.Router();
const authorize = require('../middlewares/secureRoutes');
const uploadLogo = require('../middlewares/uploads');


router.route('/login').post(userController.userLogin);

// Logo
router.route('/addLogo').post(authorize, uploadLogo.single('file'), schoolController.addLogo);

// Sections
router.route('/getSection').get(authorize, schoolController.getSections);
router.route('/addSection').post(authorize, schoolController.addSection);
router.route('/updateSection').put(authorize, schoolController.updateSection);
router.route('/deleteSection').delete(authorize, schoolController.deleteBanner);

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

