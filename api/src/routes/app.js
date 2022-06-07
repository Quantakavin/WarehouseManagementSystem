const router = require('express').Router();
//const rmaRoute = require('./rma.route');
const userRoute = require('./userRoutes');
const userGroupRoutes = require('./userGroupRoutes');
const notificationGroupRoutes = require('./notificationGroupRoutes');

router.use(userRoute);
router.use(userGroupRoutes);
router.use(notificationGroupRoutes);

module.exports = router;