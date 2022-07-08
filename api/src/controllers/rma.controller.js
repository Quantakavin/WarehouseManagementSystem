const { parse } = require('dotenv');
const { rmaService } = require('../services');
const config = require('../config/config');
const redisClient = require('../config/caching');

// Get RMA
module.exports.getAllRMA = async (req, res) => {
    try {
        const result = await rmaService.getAllRMA();

        if (!result)
            return res.status(404).json({
                error: 'No RMA requests Found!'
            });

        return res.status(200).json({
            result
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getRMAProducts = async (req, res) => {
    const { RmaID } = req.params;
    try {
        const result = await rmaService.getRMAProducts(RmaID);

        if (!result)
            return res.status(404).json({
                error: 'No RMA requests Found!'
            });

        return res.status(200).json({
            result
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getRMADetails = async (req, res) => {
    const { RMANo } = req.params;
    try {
        const reqRMA = await redisClient.get(`rma#${RMANo}`);
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
            }
            redisClient.set(`rma#${RMANo}`, JSON.stringify(output));
            return res.status(200).send(output);
        }
        return res.status(404).json({ message: 'Cannot find user with that id' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getByRMANo = async (req, res) => {
    const { RMANo } = req.params;
    try {
        const result = await rmaService.getByRMANo(RMANo);
        if (!result)
            return res.status(404).json({
                error: `RMA ${RMANo} Not Found!`
            });

        return res.status(200).json({
            result
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getMyRMA = async (req, res) => {
    const { SalesmanID } = req.params;
    try {
        const result = await rmaService.getSalesmanRMA(SalesmanID);

        if (!result)
            return res.status(404).json({
                error: 'You have no RMA requests!'
            });

        return res.status(200).json({
            result
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getPendingRMA = async (req, res) => {
    try {
        const result = await rmaService.getPendingRMA();

        if (!result)
            return res.status(404).json({
                error: 'No RMA requests Found!'
            });

        return res.status(200).json({
            result
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getAcceptedRMA = async (req, res) => {
    try {
        const result = await rmaService.getAcceptedRMA();

        if (!result)
            return res.status(404).json({
                error: 'No RMA requests Found!'
            });

        return res.status(200).json({
            result
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getReceivedRMA = async (req, res) => {
    try {
        const result = await rmaService.getReceivedRMA();

        if (!result)
            return res.status(404).json({
                error: 'No RMA requests Found!'
            });

        return res.status(200).json({
            result
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getVerifiedRMA = async (req, res) => {
    try {
        const result = await rmaService.getVerifiedRMA();

        if (!result)
            return res.status(404).json({
                error: 'No RMA requests Found!'
            });

        return res.status(200).json({
            result
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

// Get RMA by RMA number
module.exports.getByRMANo = async (req, res) => {
    const { RMANo } = req.params;
    try {
        const result = await rmaService.getByRMANo(RMANo);
        if (!result)
            return res.status(404).json({
                error: `RMA ${RMANo} Not Found!`
            });

        return res.status(200).json({
            result
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

// Create RMA
module.exports.newRMA = async (req, res) => {
    const {
        company,
        contactperson,
        contactno,
        invoice,
        salesmanid,
        instruction
    } = req.body;
    try {
        const results = await rmaService.insertRMA(
            company,
            contactperson,
            contactno,
            invoice,
            salesmanid,
            instruction
        );
        if (results.length > 0) {
            // console.log(results)
            return res.status(200).json(results[0]);
        }
        return res.status(500).send('Could Not Create The RMA');
    } catch (error) {
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
    const { RMANo } = req.params;
    const { instructions } = req.body;
    try {
        const results = await rmaService.getByRMANo(RMANo);
        if (results.length > 0) {
            await rmaService.updateRmaInstructions(RMANo, instructions);
            return res.status(204).json({ message: 'RMA status updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.updateRmaCOA = async (req, res) => {
    const { RMANo } = req.params;
    const { COA } = req.body;
    try {
        const results = await rmaService.getByRMANo(RMANo);
        if (results.length > 0) {
            await rmaService.updateRmaCOA(RMANo, COA);
            return res.status(204).json({ message: 'RMA status updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
