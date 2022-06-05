const router = require('express').Router();
const TLoan = require('../controllers/tLoanController')

router.get("/searchTLoan/:tloanno", async (req, res) => {
    let { tloanno } = req.params
    try {
        let results = await TLoan.getTLoanByNo(tloanno)
        if(results) {
            return res.status(201).send(results.rows)
        } else {
            return res.status(500).send('Internal Server Error')       
        }
    }
    catch(error) {
        // console.log(error)
        return res.status(500).send('Internal Server Error')
    }
})

router.get("/allLoan", async (req, res) => {
    try {
        let results = await TLoan.getAll()
        if(results) {
            return res.status(201).send(results.rows)
        } else {
            return res.status(500).send('Internal Server Error')
        }
    }
    catch(error) {
        // console.log(error)
        return res.status(500).send('Internal Server Error')
    }
})

router.post("/newLoan", async (req, res) => {
    let {TLoanTypeID, CompanyID, TLoanNumber, Requestor, Purpose, ApplicationDate, Duration, RequiredDate, TLoanStatusID, PickStatus, Remarks} = req.body
    try {
        let results = await TLoan.createTLoan(TLoanTypeID, CompanyID, TLoanNumber, Requestor, Purpose, ApplicationDate, Duration, RequiredDate, TLoanStatusID, PickStatus, Remarks)
        if(results) {
            // console.log(results)
            return res.status(201).send(results)
        } else {
            return res.status(500).send('Internal Server Error') 
        }
    }
    catch(error) {
        // console.log(error)
        return res.status(500).send('Internal Server Error')
    }
})


module.exports = router;