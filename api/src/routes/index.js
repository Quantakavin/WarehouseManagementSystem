const router = require('express').Router();
//const rmaRoute = require('./rma.route');
const companyRoute = require('./companyRoutes');
const userRoute = require('./userRoutes');
const userGroupRoutes = require('./userGroupRoutes');
const notificationGroupRoutes = require('./notificationGroupRoutes');
const tloanRoutes = require('./tLoanRoutes');

//router.use(rmaRoute);
router.use(companyRoute);
router.use(userRoute);
router.use(userGroupRoutes);
router.use(notificationGroupRoutes);
router.use(tloanRoutes);

module.exports = router;
