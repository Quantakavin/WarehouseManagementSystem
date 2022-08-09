const router = require('express').Router();
const authorization = require('../middlewares/authorization');
const validation = require('../middlewares/validation');
const notificationController= require('../controllers/notificationController');

router.get(
    '/notifications/:id',
    authorization.verifyCorrectUser,
    notificationController.getAllNotifications
);

router.put(
    '/marknotificationsasread/:id',
    authorization.verifyCorrectUser,
    notificationController.markReadNotifications
);

module.exports = router;