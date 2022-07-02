const router = require('express').Router();
const { rmaController } = require('../controllers');

router.get('/', rmaController.getAllRMA());
router.get('/:RMANO', rmaController.getByRMANO());
router.post('/', rmaController.create());
router.put('/RMAManagement/:RMANO', rmaController.updateRmaAccepted());
router.put('/RMAChecklist/:RMANO', rmaController.updateProductReceived());
router.put('/RMAVerification/:RMANO', rmaController.updateInstructions());

module.exports = router;
