const router = require('express').Router();
const rmaController = require('../controllers/rma.controller');

router.get('/myRMA/:SalesmanID', rmaController.getMyRMA);
router.get('/pendingRMA', rmaController.getPendingRMA);
router.get('/acceptedRMA', rmaController.getAcceptedRMA);
router.get('/receivedRMA', rmaController.getReceivedRMA);
router.get('/verifiedRMA', rmaController.getVerifiedRMA);
router.get('/RMA/:RMANo', rmaController.getByRMANo);
router.get('/RMADetails/:RMANo', rmaController.getRMADetails);
router.get('/RMA/Product/:RmaID', rmaController.getRMAProducts);
router.post('/newRMA', rmaController.newRMA);
router.put('/acceptRMA/:RMANo',rmaController.updateRmaAccepted)
router.put('/rejectRMA/:RMANo',rmaController.updateRmaRejected)
router.put('/receiveRMA/:RMANo',rmaController.updateRmaReceived)
router.put('/verifyRMA/:RMANo',rmaController.updateRmaInstructions)
router.put('/COARMA/:RMANo',rmaController.updateRmaCOA)

module.exports = router;
