const router = require('express').Router();
const rmaController = require('../controllers/rma.controller');

router.get('/AllRMA', rmaController.getAllRMA);
router.get('/RMA/:RMANo', rmaController.getByRMANo);
router.get('/RMA/Product/:RmaID', rmaController.getRMAProducts);
router.get('/RMADetails/:RMANo', rmaController.getRMADetails);
router.get('/myAcceptedRMA/:SalesmanID', rmaController.getMyAcceptedRMA);
router.get('/myRejectedRMA/:SalesmanID', rmaController.getMyRejectedRMA);
router.get('/pendingRMA', rmaController.getPendingRMA);
router.get('/acceptedRMA', rmaController.getAcceptedRMA);
router.get('/receivedRMA', rmaController.getReceivedRMA);
router.get('/verifiedRMA', rmaController.getVerifiedRMA);
router.post('/newRMA', rmaController.newRMA);
router.put('/acceptRMA/:RMANo',rmaController.updateRmaAccepted)
router.put('/rejectRMA/:RMANo',rmaController.updateRmaRejected)
router.put('/receiveRMA/:RMANo',rmaController.updateRmaReceived)
router.put('/verifyRMA' ,rmaController.updateRmaInstructions)
router.put('/closeRMA/:RMANo',rmaController.closeRma)
// router.put('/COARMA/:RMANo',rmaController.updateRmaCOA)

module.exports = router;
