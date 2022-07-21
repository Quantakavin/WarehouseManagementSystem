const router = require('express').Router();
const authorization = require('../middlewares/authorization');
const validation = require('../middlewares/validation');
const userGroupController = require('../controllers/userGroupController');

router.get('/usergroup/:id', authorization.verifyAdmin, userGroupController.getUserGroupById);
router.get('/usergroup2/:id', authorization.verifyAdmin, userGroupController.getUserGroupById2);
router.get('/groupfeatures/:id', authorization.verifyAdmin, userGroupController.getGroupFeaturesByID);
router.get('/usergroup', authorization.verifyAdmin, userGroupController.getUserGroupByName);
router.get('/usergroup2', authorization.verifyAdmin, userGroupController.getUserGroupByName);
router.get('/usergroupnames', authorization.verifyAdmin, userGroupController.getAllNames);
router.get('/filterusergroups', authorization.verifyAdmin, userGroupController.filterUserGroups);
router.get('/usergroups', authorization.verifyAdmin, userGroupController.getAllUserGroups);
router.post(
    '/usergroup',
    authorization.verifyAdmin,
    validation.validateUserGroup,
    userGroupController.createUserGroup
);
router.put(
    '/usergroup/:id',
    authorization.verifyAdmin,
    validation.validateUserGroup,
    userGroupController.updateUserGroup
);
router.delete('/usergroup/:id', authorization.verifyAdmin, userGroupController.deleteUserGroup);

module.exports = router;
