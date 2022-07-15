const router = require('express').Router();
//const rmaRoute = require('./rma.route');
const companyRoute = require('./companyRoutes');
const featureRoute = require('./featureRoutes');
const userRoute = require('./userRoutes');
const userGroupRoutes = require('./userGroupRoutes');
const productRoutes = require('./productRoutes');
const notificationGroupRoutes = require('./notificationGroupRoutes');
const tloanRoutes = require('./tLoanRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const binRoutes = require('./binRoutes');
const rmaRoutes = require('./rma.route')

router.use(rmaRoutes);
router.use(companyRoute);
router.use(featureRoute);
router.use(userRoute);
router.use(userGroupRoutes);
router.use(productRoutes);
router.use(notificationGroupRoutes);
router.use(tloanRoutes);
router.use(dashboardRoutes);
router.use(binRoutes);

module.exports = router;
