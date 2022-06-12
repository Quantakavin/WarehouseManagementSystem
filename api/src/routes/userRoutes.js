const router = require('express').Router();
const authorization = require('../middlewares/authorization');
const validation = require('../middlewares/validation');
const userController = require('../controllers/userController');

router.post('/login', validation.validateLogin, userController.loginUser);
router.get('/user/:id', authorization.verifyAdmin, userController.getUserById);
router.get('/user', authorization.verifyAdmin, userController.getUserByName);
router.get('/users', authorization.verifyAdmin, userController.getAllUsers);
router.post('/user', authorization.verifyAdmin, validation.validateUser, userController.createUser);
router.put(
    '/user/:id',
    authorization.verifyAdmin,
    validation.validateUser,
    userController.updateUser
);
/*
router.delete('/user/:id', authorization.verifyAdmin, userController.deleteUser);
*/
module.exports = router;
