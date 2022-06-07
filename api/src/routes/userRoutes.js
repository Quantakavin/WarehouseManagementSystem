const router = require('express').Router();
const validation = require('../middlewares/validation')
const userController = require('../controllers/userController');

router.post('/login', validation.validateLogin, userController.loginUser);
router.get('/user/:id', userController.getUserById);
router.get('/user', userController.getUserByName);
router.get('/users', userController.getAllUsers);
router.post('/user', userController.createUser);
/*
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
*/
module.exports = router;
