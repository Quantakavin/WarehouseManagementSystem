const router = require('express').Router();
//const rmaRoute = require('./rma.route');
const companyRoute = require('./companyRoutes');
const userRoute = require('./userRoutes');
const userGroupRoutes = require('./userGroupRoutes');
const productRoutes = require('./productRoutes');
const notificationGroupRoutes = require('./notificationGroupRoutes');
const tloanRoutes = require('./tLoanRoutes');
const dashboardRoutes = require('./dashboardRoutes');
// const binRoutes = require('./binRoutes');

//router.use(rmaRoute);
router.use(companyRoute);
router.use(userRoute);
router.use(userGroupRoutes);
router.use(productRoutes);
router.use(notificationGroupRoutes);
router.use(tloanRoutes);
router.use(dashboardRoutes);
// router.use(binRoutes);

module.exports = router;
