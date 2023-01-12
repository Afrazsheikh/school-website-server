const express = require('express');

const userServicesRoutes = require('./server/routes/userServices.router');
const UIServicesRoutes = require('./server/routes/userInterfaceServices.router');



const router = express.Router(); // eslint-disable-line new-cap



/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

router.use('/userService', userServicesRoutes);
router.use('/UIService', UIServicesRoutes);



module.exports = router;``
