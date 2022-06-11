const router = require('express').Router();

const notificationGroupController = require('../controllers/notificationGroupController');

router.get('/notificationgroup/:id', notificationGroupController.getNotificationGroupById);
router.get('/notificationgroup', notificationGroupController.getNotificationGroupByName);
router.get('/notificationgroups', notificationGroupController.getAllNotificationGroups);
/*
router.post('/notificationgroup', notificationGroupController.createNotificationGroup);
router.put('/notificationgroup/:id', notificationGroupController.updateNotificationGroup);
router.delete('/notificationgroup/:id', notificationGroupController.deleteNotificationGroup);
*/

module.exports = router;
