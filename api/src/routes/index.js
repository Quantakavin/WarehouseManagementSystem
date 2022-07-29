const router = require('express').Router();
const companyRoute = require('./companyRoutes');
const featureRoute = require('./featureRoutes');
const notificationFeatureRoutes = require('./notificationFeatureRoutes');
const userRoute = require('./userRoutes');
const userGroupRoutes = require('./userGroupRoutes');
const productRoutes = require('./productRoutes');
const notificationGroupRoutes = require('./notificationGroupRoutes');
const tloanRoutes = require('./tLoanRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const binRoutes = require('./binRoutes');
const rmaRoutes = require('./rma.route');
const resetPasswordRoutes = require('./resetPasswordRoutes');

router.use(companyRoute);
router.use(featureRoute);
router.use(notificationFeatureRoutes);
router.use(userRoute);
router.use(userGroupRoutes);
router.use(productRoutes);
router.use(notificationGroupRoutes);
router.use(tloanRoutes);
router.use(dashboardRoutes);
router.use(binRoutes);
router.use(rmaRoutes);
router.use(resetPasswordRoutes);

module.exports = router;
