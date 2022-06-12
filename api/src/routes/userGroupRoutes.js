const router = require('express').Router();
const validation = require('../middlewares/validation')
const userGroupController = require('../controllers/userGroupController');

router.get('/usergroup/:id', userGroupController.getUserGroupById);
router.get('/usergroup', userGroupController.getUserGroupByName);
router.get('/usergroups', userGroupController.getAllUserGroups);
router.post('/usergroup', validation.validateUserGroup, userGroupController.createUserGroup);
router.put('/usergroup/:id', validation.validateUserGroup, userGroupController.updateUserGroup);
router.delete('/usergroup/:id', userGroupController.deleteUserGroup);

module.exports = router;
