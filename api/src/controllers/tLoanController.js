const TLoan = require('../services/tLoanService');
const redisClient = require('../config/caching');
//const { tLoanService } = require('../services');

module.exports.getLoanByNo = async (req, res) => {
    const { TLoanNumber} = req.params;
    try {
        const loanDetail = await redisClient.get(`TLoan#${TLoanNumber}`);
        if (loanDetail !== null) {
            const redisresults = JSON.parse(loanDetail);
            return res.status(200).json(redisresults);
        }
        let output = [];
        const results = await TLoan.getLoanByNumber(TLoanNumber);
        if (results[0].length > 0) {
            [output] = results;
            const IDOfTLoan = results[0][0].TLoanID;
            const results2 = await TLoan.getTLoanOutItem(IDOfTLoan);
            console.log(output);
            if (results2.length > 0) {
                [output[0].Items] = results2;
                output = output[0];
            }
            redisClient.set(`TLoanItems#${TLoanNumber}`, JSON.stringify(output));
            return res.status(200).send(output);
        }
        return res.status(404).json({ message: 'Cannot find' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }

    
    
};

module.exports.allLoan = async (req, res) => {
    try {
        const TLoans = await redisClient.get('TLoans');
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getAll();
        redisClient.set('TLoans', JSON.stringify(results[0]));
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('You have not made any TLoans');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.newLoan = async (req, res) => {
    const {
        type,
        company,
        number,
        name,
        purpose,
        applicationdate,
        duration,
        requireddate,
        pick,
        remarks,
        user,
        email,
        collect,
        items
     } = req.body;
    try {
        const tloanItems = items.map((item) => {
            return item
        })
         await TLoan.createTLoan(
            type,
            company,
            number,
            name,
            purpose,
            applicationdate,
            duration,
            requireddate,
            pick,
            remarks, 
            user,
            email,
            collect,
            tloanItems           
        );
       
            return res.status(201).send('TLoan created successfully!');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.loanExtension = async (req, res) => {
    const { id, duration, reason } = req.body;
    try {
        const results = await TLoan.extension(id, duration, reason);
        if (results.length > 0) {
            return res.status(200).send('Extension Request Submitted!').json(results[0]);
        } else {
            return res.status(500).send('Extension Request Unsuccessful!');
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.currentLoan = async (req, res) => {
    try {
        const results = await TLoan.getCurrent();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('You have not made any TLoans');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.draftsLoan = async (req, res) => {
    try {
        const results = await TLoan.getDraft();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('You have not made any TLoans');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.historyLoan = async (req, res) => {
    try {
        const results = await TLoan.getHistory();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('You have not made any TLoans');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.pendingLoan = async (req, res) => {
    try {
        const results = await TLoan.getPending();
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('You have not made any TLoans');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};



module.exports.approveLoan = async(req , res) =>{
    const {number} = req.body
    try{
        const results = await TLoan.approveLoan(number)
        if(results) {
            return res.status(200).send('Status has been Updated')
        } else {
            return res.status(500).send('Status failed to Update')
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Internal Server Error')

    }

}

module.exports.rejectLoan = async(req , res) =>{
    const {number} = req.body
    try{
        const results = await TLoan.rejectLoan(number)
        if(results) {
            return res.status(200).send('Status has been Updated')
        } else {
            return res.status(500).send('Status failed to Update')
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Internal Server Error')

    }


}

module.exports.pickingLoan = async(req , res) =>{
    const {number} = req.body
    try{
        const results = await TLoan.pickLoan(number)
        if(results) {
            return res.status(200).send('Status has been Updated')
        } else {
            return res.status(500).send('Status failed to Update')
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Internal Server Error')

    }

}

module.exports.issuedLoan = async(req , res) =>{
    const {number} = req.body
    try{
        const results = await TLoan.issuedLoan(number)
        if(results) {
            return res.status(200).send('Status has been Updated')
        } else {
            return res.status(500).send('Status failed to Update')
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Internal Server Error')

    }

}

module.exports.dueLoan = async(req , res) =>{
    const {number} = req.body
    try{
        const results = await TLoan.dueLoan(number)
        if(results) {
            return res.status(200).send('Status has been Updated')
        } else {
            return res.status(500).send('Status failed to Update')
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Internal Server Error')

    }

}

module.exports.readyLoan = async(req , res) =>{
    const {number} = req.body
    try{
        const results = await TLoan.readyLoan(number)
        if(results) {
            return res.status(200).send('Status has been Updated')
        } else {
            return res.status(500).send('Status failed to Update')
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Internal Server Error')

    }

}

module.exports.draftLoan = async(req , res) =>{
    const {number} = req.body
    try{
        const results = await TLoan.draftLoan(number)
        if(results) {
            return res.status(200).send('Status has been Updated')
        } else {
            return res.status(500).send('Status failed to Update')
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send('Internal Server Error')

    }

}

module.exports.ManagerLoan = async (req, res) => {
    try {
        const TLoans = await redisClient.get('ManagerLoan');
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getManagerLoan();
        redisClient.set('ManagerLoan', JSON.stringify(results[0]));
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('You have not made any TLoans');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};