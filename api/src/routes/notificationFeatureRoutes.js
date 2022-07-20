const router = require('express').Router();
const authorization = require('../middlewares/authorization');
const notificationFeatureController = require('../controllers/notificationFeatureController');

router.get('/notificationfeatures', authorization.verifyAdmin, notificationFeatureController.getAllNotificationFeatures);
router.get('/notificationtypes', authorization.verifyAdmin, notificationFeatureController.getAllNotificationTypes);

module.exports = router;
