const router = require('express').Router();
const { rmaController } = require('../controllers');


router.get('/', rmaController.getAllRMA());
router.get('/:RMANO', rmaController.getByRMANO())
router.post('/', rmaController.create())

module.exports = router;
