const router = require('express').Router();
const validation = require('../middlewares/validation');
const resetPasswordController = require('../controllers/resetPasswordController');

router.post('/forgotPassword', resetPasswordController.forgotPassword);
router.post('/resetPassword', validation.validateResetToken, resetPasswordController.resetPassword);

module.exports = router;
