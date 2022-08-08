const router = require('express').Router();
const authorization = require('../middlewares/authorization');
const validation = require('../middlewares/validation');
const userController = require('../controllers/userController');

router.post('/login', validation.validateLogin, userController.loginUser);
router.get('/user/:id', authorization.verifyAdmin, userController.getUserById);
router.get('/profile/:id', authorization.verifyUser, userController.getUserById);
router.get('/user', authorization.verifyAdmin, userController.getUserByName);
router.get('/users', authorization.verifyAdmin, userController.getAllUsers);
router.get('/usernames', authorization.verifyAdmin, userController.getAllNames);
router.post('/user', authorization.verifyAdmin, validation.validateUser, userController.createUser);
router.put(
    '/user/:id',
    authorization.verifyAdmin,
    validation.validateUserUpdate,
    userController.updateUser
);

router.put('/user2fa/:id', authorization.verifyUser, userController.update2FA);

router.put('/userTele/:id', authorization.verifyUser, userController.updateUserTeleID);

router.post('/resend2fatoken', validation.validateMobileNo, userController.resend2FAToken);
router.post('/verify2fatoken', validation.validate2FAToken, userController.verify2FAToken);

router.delete('/user/:id', authorization.verifyAdmin, userController.deleteUser);

module.exports = router;
