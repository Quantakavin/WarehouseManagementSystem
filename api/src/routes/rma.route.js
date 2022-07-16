const router = require('express').Router();
const rmaController = require('../controllers/rma.controller');

router.get('/AllRMA', rmaController.getAllRMA);
router.get('/RMA/:RmaID', rmaController.getByRmaID);
router.get('/RMA/Product/:RmaID', rmaController.getRMAProducts);
router.get('/RMADetails/:RmaID', rmaController.getRMADetails);
router.get('/myAcceptedRMA/:SalesmanID', rmaController.getMyAcceptedRMA);
router.get('/myRejectedRMA/:SalesmanID', rmaController.getMyRejectedRMA);
router.get('/pendingRMA', rmaController.getPendingRMA);
router.get('/acceptedRMA', rmaController.getAcceptedRMA);
router.get('/receivedRMA', rmaController.getReceivedRMA);
router.get('/verifiedRMA', rmaController.getVerifiedRMA);
router.get('/inprogressRMA', rmaController.getIPRMA);
router.get('/closedRMA', rmaController.getClosedRMA);
router.post('/newRMA', rmaController.newRMA);
router.put('/acceptRMA/:RmaID',rmaController.updateRmaAccepted)
router.put('/rejectRMA/:RmaID',rmaController.updateRmaRejected)
router.put('/receiveRMA/:RmaID',rmaController.updateRmaReceived)
router.put('/verifyRMA' ,rmaController.updateRmaInstructions)
router.put('/closeRMA/:RmaID',rmaController.closeRma)
// router.put('/COARMA/:RmaID',rmaController.updateRmaCOA)

module.exports = router;
