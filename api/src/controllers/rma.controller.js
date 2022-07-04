const { rmaService } = require('../services');

// Get RMA
exports.getAllRMA = async (req, res) => {
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

exports.getMyRMA = async (req, res) => {
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

exports.getPendingRMA = async (req, res) => {
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

exports.getAcceptedRMA = async (req, res) => {
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

exports.getReceivedRMA = async (req, res) => {
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

exports.getVerifiedRMA = async (req, res) => {
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
exports.getByRMANO = async (req, res) => {
    const { RMANo } = req.params;
    try {
        const result = await rmaService.getByRMANO(RMANo);
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
    const RMANo = req.params.id;
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
    const RMANo = req.params.id;
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

module.exports.updateProductReceived = async (req, res) => {
    const RMANo = req.params.id;
    try {
        const results = await rmaService.getByRMANO(RMANo);
        if (results.length > 0) {
            await rmaService.updateProductReceived(RMANo);
            return res.status(204).json({ message: 'RMA status updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.updateInstructions = async (req, res) => {
    const RMANo = req.params.id;
    const { instructions } = req.body;
    try {
        const results = await rmaService.getByRMANO(RMANo);
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
    const RMANo = req.params;
    const { actionTaken } = req.body;
    try {
        const results = await rmaService.getByRMANO(RMANo);
        if (results.length > 0) {
            await rmaService.updateRmaCOA(RMANo, actionTaken);
            return res.status(204).json({ message: 'RMA status updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
