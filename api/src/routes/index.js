const router = require('express').Router();

const userRoutes = require('./userRoutes');
const userGroupRoutes = require('./userGroupRoutes');
const notificationGroupRoutes = require('./notificationGroupRoutes');
const productRoutes = require('./productRoutes');
const tLoanRoutes = require('./tLoanRoutes');
const rmaRoutes = require('./rma.route');

router.use(userRoutes);
router.use(userGroupRoutes);
router.use(notificationGroupRoutes);
router.use(productRoutes);
router.use(tLoanRoutes);
router.use(rmaRoutes);

module.exports = router;