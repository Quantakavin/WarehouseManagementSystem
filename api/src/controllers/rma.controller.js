const { parse } = require('dotenv');
const { rmaService } = require('../services');
const config = require('../config/config');
const redisClient = require('../config/caching');

module.exports.getAllRMA = async (req, res) => {
    try {
        const Rma = await redisClient.get('Rma');
        if (Rma !== null) {
            const redisresults = JSON.parse(Rma);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getAllRMA();
        redisClient.set('allRMA', JSON.stringify(results[0]));
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('No RMAs found!');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.getRMAProducts = async (req, res) => {
    const { RmaID } = req.params;
    try {
        const results = await rmaService.getRMAProducts(RmaID);
        if (results[0].length > 0) {
                return res.status(200).send(results[0]);
            } else if (!results) {
                return res.status(404).json({
                    error: 'No RMA products Found!'
                });
            }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getRMADetails = async (req, res) => {
    const { RMANo } = req.params;
    try {
        const reqRMA = await redisClient.get(`rmaDetails#${RMANo}`);
        if (reqRMA !== null) {
            const redisresults = JSON.parse(reqRMA);
            return res.status(200).json(redisresults);
        }
        let output = [];
        const results = await rmaService.getByRMANo(RMANo);
        if (results[0].length > 0) {
            [output] = results;
            const IDOfRMA = results[0][0].RmaID;
            const results2 = await rmaService.getRMAProducts(IDOfRMA);
            console.log(output);
            if (results2.length > 0) {
                [output[0].RMAProducts] = results2;
                output = output[0];
            }
            redisClient.set(`rmaProductDetails#${RMANo}`, JSON.stringify(output));
            return res.status(200).send(output);
        }
        return res.status(404).json({ message: 'Cannot find RMA with that RMA No.!' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getByRMANo = async (req, res) => {
    const { RMANo } = req.params;
    try {
        const reqRMA = await redisClient.get(`rmaByRMANo#${RMANo}`);
        let output = [];
        if (reqRMA !== null) {
            const redisresults = JSON.parse(reqRMA);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getByRMANo(RMANo);
        if (results[0].length > 0) {
            [output] = results
            redisClient.set(`rmaByRMANo#${RMANo}`, JSON.stringify(output[0]));
            return res.status(200).send(output[0]);
        }
        return res.status(404).json({ message: 'Cannot find RMA with that RMA No.!' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getMyAcceptedRMA = async (req, res) => {
    const { SalesmanID } = req.params;
    try {
        const reqRMA = await redisClient.get(`myAcceptedRMA#${SalesmanID}`);
        if (reqRMA !== null) {
            const redisresults = JSON.parse(reqRMA);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getSalesmanAcceptedRMA(SalesmanID);
        if (results[0].length > 0) {
            redisClient.set(`myAcceptedRMA#${SalesmanID}`, JSON.stringify(results));
            return res.status(200).send(results[0]);
        }
        return res.status(404).json({ message: 'Cannot find RMA requests under you!' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getMyRejectedRMA = async (req, res) => {
    const { SalesmanID } = req.params;
    try {
        const reqRMA = await redisClient.get(`myRejectedRMA#${SalesmanID}`);
        if (reqRMA !== null) {
            const redisresults = JSON.parse(reqRMA);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getSalesmanRejectedRMA(SalesmanID);
        if (results[0].length > 0) {
            redisClient.set(`myRejectedRMA#${SalesmanID}`, JSON.stringify(results));
            return res.status(200).send(results[0]);
        }
        return res.status(404).json({ message: 'Cannot find RMA requests under you!' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getPendingRMA = async (req, res) => {
    try {
        const Rma = await redisClient.get('Rma');
        if (Rma !== null) {
            const redisresults = JSON.parse(Rma);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getPendingRMA();
        redisClient.set('PendingRMA', JSON.stringify(results[0]));
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('No RMAs found!');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.getAcceptedRMA = async (req, res) => {
    try {
        const Rma = await redisClient.get('Rma');
        if (Rma !== null) {
            const redisresults = JSON.parse(Rma);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getAcceptedRMA();
        redisClient.set('AcceptedRMA', JSON.stringify(results[0]));
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('No RMAs found!');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.getReceivedRMA = async (req, res) => {
    try {
        const Rma = await redisClient.get('Rma');
        if (Rma !== null) {
            const redisresults = JSON.parse(Rma);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getReceivedRMA();
        redisClient.set('ReceivedRma', JSON.stringify(results[0]));
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('No RMAs found!');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.getVerifiedRMA = async (req, res) => {
    try {
        const Rma = await redisClient.get('Rma');
        if (Rma !== null) {
            const redisresults = JSON.parse(Rma);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getVerifiedRMA();
        redisClient.set('VerifiedRma', JSON.stringify(results[0]));
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('No RMAs found!');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

// Create RMA
module.exports.newRMA = async (req, res) => {
    const {
        contactperson,
        contactno,
        rmano,
        salesmanid,
        contactemail,
        company,
        products
        // itemcode,
        // invoiceno,
        // dono,
        // dateofpurchase,
        // reasonforreturn
    } = req.body;
    try {
        const rmaProducts = products.map((product) => {
            return product
        })
        const resultsrma = await rmaService.insertRMAData(
            contactperson,
            contactno,
            rmano,
            salesmanid,
            contactemail,
            company,
            rmaProducts
        );
        if (resultsrma.length > 0) {
            // console.log(results)
            return res.status(200).json(resultsrma);
        }
        return res.status(500).send('Could Not Create The RMA');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.updateRmaAccepted = async (req, res) => {
    const { RMANo } = req.params;
    try {
        const results = await rmaService.getByRMANo(RMANo);
        if (results.length > 0) {
            await rmaService.updateRmaAccepted(RMANo);
            return res.status(204).json({ message: 'RMA status updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.updateRmaRejected = async (req, res) => {
    const { RMANo } = req.params;
    try {
        const results = await rmaService.getByRMANo(RMANo);
        if (results.length > 0) {
            await rmaService.updateRmaRejected(RMANo);
            return res.status(204).json({ message: 'RMA status updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.updateRmaReceived = async (req, res) => {
    const { RMANo } = req.params;
    try {
        const results = await rmaService.getByRMANo(RMANo);
        if (results.length > 0) {
            await rmaService.updateRMAReceived(RMANo);
            return res.status(204).json({ message: 'RMA status updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.updateRmaInstructions = async (req, res) => {
    const {
        RMANo,
        products
    } = req.body;
    try {
        const resultsrma = await rmaService.updateRmaInstructions(RMANo, products);
        return res.status(200).json(resultsrma);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

// module.exports.updateRmaCOA = async (req, res) => {
//     const { RMANo } = req.params;
//     const { COA } = req.body;
//     try {
//         const results = await rmaService.getByRMANo(RMANo);
//         if (results.length > 0) {
//             await rmaService.updateRmaCOA(RMANo, COA);
//             return res.status(204).json({ message: 'RMA status updated successfully!' });
//         }
//         return res.status(404).json({ message: 'Cannot find RMA with that number' });
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error!' });
//     }
// };

module.exports.closeRma = async (req, res) => {
    const { RMANo } = req.params;
    try {
        const results = await rmaService.getByRMANo(RMANo);
        if (results.length > 0) {
            await rmaService.closeRMA(RMANo);
            return res.status(204).json({ message: 'RMA status updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};