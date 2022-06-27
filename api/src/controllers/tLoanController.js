const TLoan = require('../services/tLoanService')
const redisClient = require('../config/caching');

module.exports.searchLoan = async (req, res) => {
    let TLoanNumber = req.params.number
    try {
        const TLoans = await redisClient.get('TLoans');
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getLoanByNumber(TLoanNumber)
        redisClient.set('TLoans', JSON.stringify(results[0]));
        if(results.length > 0) {
            return res.status(200).json(results[0])
        } else {
            return res.status(404).send('Does Not Exist')       
        }
    }
    catch(error) {
        // console.log(error)
        return res.status(500).send('Internal Server Error')
    }
}

module.exports.allLoan = async (req, res) => {
    try {
        const results = await TLoan.getAll()
        if(results.length > 0) {
            return res.status(200).json(results[0])
        } else {
            return res.status(404).send('You have not made any TLoans')
        }
    }
    catch(error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }
}

module.exports.newLoan = async (req, res) => {
    const {type, company, number, name, purpose, applicationdate, duration, requireddate, status, pick, remarks} = req.body
    try {
        const results = await TLoan.createTLoan(type, company, number, name, purpose, applicationdate, duration, requireddate, status, pick, remarks)
        if(results.length > 0) {
            //console.log(results)
            return res.status(200).json(results[0])
        } else {
            return res.status(500).send('Could Not Make The Loan') 
        }
    }
    catch(error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }
}

module.exports.loanExtension = async ( req , res ) => {
    const {id,duration,reason} = req.body
    try{
        const results = await TLoan.extension(id,duration,reason)
        if(results.length > 0){
            return res.status(200).send('Extension Request Submitted!').json(results[0])
        }else{
            return res.status(500).send('Extension Request Unsuccessful!')
        }
    }
    catch(error){
        return res.status(500).send('Internal Server Error')
    }
}

module.exports.currentLoan = async (req, res) => {
    try {
        const results = await TLoan.getCurrent()
        if(results.length > 0) {
            return res.status(200).json(results[0])
        } else {
            return res.status(404).send('You have not made any TLoans')
        }
    }
    catch(error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }
}

module.exports.draftLoan = async (req, res) => {
    try {
        const results = await TLoan.getDraft()
        if(results.length > 0) {
            return res.status(200).json(results[0])
        } else {
            return res.status(404).send('You have not made any TLoans')
        }
    }
    catch(error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }
}

module.exports.historyLoan = async (req, res) => {
    try {
        const results = await TLoan.getHistory()
        if(results.length > 0) {
            return res.status(200).json(results[0])
        } else {
            return res.status(404).send('You have not made any TLoans')
        }
    }
    catch(error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }
}

module.exports.pendingLoan = async (req, res) => {
    try {
        const results = await TLoan.getPending()
        if(results.length > 0) {
            return res.status(200).json(results[0])
        } else {
            return res.status(404).send('You have not made any TLoans')
        }
    }
    catch(error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }
}