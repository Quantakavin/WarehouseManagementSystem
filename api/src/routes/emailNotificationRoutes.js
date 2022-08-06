const router = require('express').Router();
const emailNotificationController = require('../controllers/emailNotificationController');


router.post('/sendEmailNotif', emailNotificationController.emailNotification);

module.exports = router;