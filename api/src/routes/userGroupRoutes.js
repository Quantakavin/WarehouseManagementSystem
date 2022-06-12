const router = require('express').Router();
const authorization = require('../middlewares/authorization');
const validation = require('../middlewares/validation');
const userGroupController = require('../controllers/userGroupController');

router.get('/usergroup/:id', authorization.verifyAdmin, userGroupController.getUserGroupById);
router.get('/usergroup', authorization.verifyAdmin, userGroupController.getUserGroupByName);
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
