const express = require('express');

const userServicesRoutes = require('./server/routes/userServices.router');
const adminRoutes = require('./server/routes/admin.router');



const router = express.Router(); // eslint-disable-line new-cap



/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));
router.use('/uploads', express.static('./server/images'));
router.use('/documents', express.static('./server/documents'));

router.use('/userService', userServicesRoutes);
router.use('/adminService', adminRoutes);




module.exports = router;
