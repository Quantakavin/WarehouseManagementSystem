//const userGroupRoutes = require('./userGroupRoutes');
//const notificationGroupRoutes = require('./notificationGroupRoutes');
const userRoutes = require('./userRoutes');
const router = require('express').Router();

//router.use(userGroupRoutes);
//router.use(notificationGroupRoutes);
router.use(userRoutes);

module.exports = router;