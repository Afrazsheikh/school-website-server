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
router.route('/updateSection').put(authorize, schoolController.updateBanner);
router.route('/deleteSection').delete(authorize, schoolController.deleteBanner);


// Gallery

module.exports = router;

