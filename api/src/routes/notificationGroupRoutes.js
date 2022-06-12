const router = require('express').Router();
const authorization = require('../middlewares/authorization');
const validation = require('../middlewares/validation');
const notificationGroupController = require('../controllers/notificationGroupController');

router.get(
    '/notificationgroup/:id',
    authorization.verifyAdmin,
    notificationGroupController.getNotificationGroupById
);
router.get(
    '/notificationgroup',
    authorization.verifyAdmin,
    notificationGroupController.getNotificationGroupByName
);
router.get(
    '/notificationgroups',
    authorization.verifyAdmin,
    notificationGroupController.getAllNotificationGroups
);
router.post(
    '/notificationgroup',
    authorization.verifyAdmin,
    validation.validateNotificationGroup,
    notificationGroupController.createNotificationGroup
);
router.put(
    '/notificationgroup/:id',
    authorization.verifyAdmin,
    validation.validateNotificationGroup,
    notificationGroupController.updateNotificationGroup
);
router.delete(
    '/notificationgroup/:id',
    authorization.verifyAdmin,
    notificationGroupController.deleteNotificationGroup
);

module.exports = router;
