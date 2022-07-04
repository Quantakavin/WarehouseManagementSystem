const router = require('express').Router();
const rmaController = require('../controllers/rma.controller');

router.get('/myRMA', rmaController.getMyRMA);
router.get('/pendingRMA', rmaController.getAllRMA);
router.get('/acceptedRMA', rmaController.getAcceptedRMA);
router.get('/receivedRMA', rmaController.getReceivedRMA);
router.get('/verifiedRMA', rmaController.getVerifiedRMA);
router.get('/RMA/:RMANo', rmaController.getByRMANo);
router.post('/newRMA', rmaController.newRMA);
router.put('/RMA/accept/:RMANo',rmaController.updateRmaAccepted)
router.put('/RMA/reject/:RMANo',rmaController.updateRmaRejected)
router.put('/RMA/receive/:RMANo',rmaController.updateProductReceived)
router.put('/RMA/verify/:RMANo',rmaController.updateInstructions)
router.put('/RMA/COA/:RMANo',rmaController.updateRmaCOA)

module.exports = router;
