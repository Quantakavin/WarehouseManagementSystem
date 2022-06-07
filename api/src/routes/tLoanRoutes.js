const router = require('express').Router();
const TLoanRouter = require('../controllers/tLoanController');

router.use('/tloan',TLoanRouter)

module.exports = router