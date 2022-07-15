const router = require('express').Router();
const authorization = require('../middlewares/authorization');
const featureController = require('../controllers/featureController');

router.get('/features', authorization.verifyAdmin, featureController.getAllFeatures);
router.get('/featurerights', authorization.verifyAdmin, featureController.getAllFeatureRights);

module.exports = router;
