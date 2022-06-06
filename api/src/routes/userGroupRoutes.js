const router = require('express').Router();
const userGroupController = require('./controllers/userGroupController');

router.get('/usergroup/:id', userGroupController.getUserGroupById);
router.get('/usergroup', userGroupController.getUserGroupByName);
router.get('/usergroups', userGroupController.getAllUserGroups);
router.post('/usergroup', userGroupController.createUserGroup);
router.put('/usergroup/:id', userGroupController.updateUserGroup);
router.delete('/usergroup/:id', userGroupController.deleteUserGroup);

module.exports = router;
