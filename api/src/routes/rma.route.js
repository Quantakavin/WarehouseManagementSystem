const router = require('express').Router();
const { rmaController } = require('../controllers');

router.get('/RMA', rmaController.getAllRMA());
router.get('/RMA/:RMANo', rmaController.getByRMANO());
router.post('/', rmaController.create());
router.put('/RMA/accept',rmaController.updateRmaAccepted)
router.put('/RMA/reject',rmaController.updateRmaRejected)
router.put('/RMA/receive',rmaController.updateProductReceived)
router.put('/RMA/verify',rmaController.updateInstructions)
router.put('/RMA/COA',rmaController.updateRmaCOA)

module.exports = router;
