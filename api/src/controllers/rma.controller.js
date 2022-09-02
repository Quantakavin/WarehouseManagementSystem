/* eslint-disable prefer-destructuring */
const { rmaService } = require('../services');
const redisClient = require('../config/caching');
const {
    rmaAcceptedMail,
    rmaRejectedMail,
    rmaReceivedMail,
    rmaVerifiedMail,
    rmaInprogressMail,
    rmaClosedMail
} = require('./emailNotificationController');
const {
    rmaAcceptedTele,
    rmaRejectedTele,
    rmaReceivedTele,
    rmaVerifiedTele,
    rmaClosedTele,
    rmaProgressTele
} = require('./telegramNotificationController');
const { createNotification } = require('./notificationController');

module.exports.getAllRMA = async (req, res) => {
    try {
        const Rma = await redisClient.get('allRma');
        if (Rma !== null) {
            const redisresults = JSON.parse(Rma);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getAllRMA();
        redisClient.set('allRMA', JSON.stringify(results[0]), { EX: 60 * 60 * 24 });
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('No RMAs found!');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.getRMAProducts = async (req, res) => {
    const { RmaID } = req.params;
    try {
        const Rma = await redisClient.get(`rmaProducts#${RmaID}`);
        if (Rma !== null) {
            const redisresults = JSON.parse(Rma);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getRMAProducts(RmaID);
        redisClient.set(`rmaProducts#${RmaID}`, JSON.stringify(results[0]), { EX: 60 * 60 * 24 });
        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        }
        return res.status(404).json({ error: 'No RMA products Found!' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getRMADetails = async (req, res) => {
    const { RmaID } = req.params;
    try {
        const reqRMA = await redisClient.get(`rmaDetails#${RmaID}`);
        if (reqRMA !== null) {
            const redisresults = JSON.parse(reqRMA);
            return res.status(200).json(redisresults);
        }
        let output = [];
        const results = await rmaService.getByRmaID(RmaID);
        if (results[0].length > 0) {
            [output] = results;
            const IDOfRMA = results[0][0].RmaID;
            const results2 = await rmaService.getRMAProducts(IDOfRMA);
            if (results2.length > 0) {
                [output[0].RMAProducts] = results2;
                output = output[0];
            }
            redisClient.set(`rmaDetails#${RmaID}`, JSON.stringify(output), { EX: 60 * 60 * 24 });
            return res.status(200).send(output);
        }
        return res.status(404).json({ message: 'Cannot find RMA with that RMA No.!' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getByRmaID = async (req, res) => {
    const { RmaID } = req.params;
    try {
        const reqRMA = await redisClient.get(`rmaByRmaID#${RmaID}`);
        let output = [];
        if (reqRMA !== null) {
            const redisresults = JSON.parse(reqRMA);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getByRmaID(RmaID);
        if (results[0].length > 0) {
            [output] = results;
            redisClient.set(`rmaByRmaID#${RmaID}`, JSON.stringify(output[0]), { EX: 60 * 60 * 24 });
            return res.status(200).send(output[0]);
        }
        return res.status(404).json({ message: 'Cannot find RMA with that RMA No.!' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getMyPendingRMA = async (req, res) => {
    const { SalesmanID } = req.params;
    try {
        const reqRMA = await redisClient.get(`myPendingRMA#${SalesmanID}`);
        if (reqRMA !== null) {
            const redisresults = JSON.parse(reqRMA);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getSalesmanPendingRMA(SalesmanID);
        if (results[0].length > 0) {
            redisClient.set(`myPendingRMA#${SalesmanID}`, JSON.stringify(results[0]), {
                EX: 60 * 60 * 24
            });
            return res.status(200).send(results[0]);
        }
        return res.status(404).json({ message: 'Cannot find pending RMA requests under you!' });
    } catch (error) {
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
            redisClient.set(`myAcceptedRMA#${SalesmanID}`, JSON.stringify(results[0]), {
                EX: 60 * 60 * 24
            });
            redisClient.del('PendingRMA');
            redisClient.del('AcceptedRMA');
            redisClient.del('ReceivedRMA');
            redisClient.del('ProcessingRMA');
            redisClient.del('VerifiedRMA');
            redisClient.del('InProgressRMA');
            redisClient.del('ClosedRMA');
            return res.status(200).send(results[0]);
        }
        return res.status(404).json({ message: 'Cannot find accepted RMA requests under you!' });
    } catch (error) {
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
            redisClient.set(`myRejectedRMA#${SalesmanID}`, JSON.stringify(results[0]), {
                EX: 60 * 60 * 24
            });
            return res.status(200).send(results[0]);
        }
        return res.status(404).json({ message: 'Cannot find rejected RMA requests under you!' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getMyIPRMA = async (req, res) => {
    const { SalesmanID } = req.params;
    try {
        const reqRMA = await redisClient.get(`myIPRMA#${SalesmanID}`);
        if (reqRMA !== null) {
            const redisresults = JSON.parse(reqRMA);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getSalesmanIPRMA(SalesmanID);
        if (results[0].length > 0) {
            redisClient.set(
                `myIPRMA#${SalesmanID}`,
                JSON.stringify(results[0], { EX: 60 * 60 * 24 })
            );
            return res.status(200).send(results[0]);
        }
        return res
            .status(404)
            .json({ message: 'Cannot find RMA requests under you that are in progress!' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getPendingRMA = async (req, res) => {
    try {
        const Rma = await redisClient.get('PendingRMA');
        if (Rma !== null) {
            const redisresults = JSON.parse(Rma);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getPendingRMA();
        redisClient.set('PendingRMA', JSON.stringify(results[0]), { EX: 60 * 60 * 24 });
        if (results.length > 0) {
            redisClient.del('PendingRMA');
            redisClient.del('AcceptedRMA');
            redisClient.del('ReceivedRMA');
            redisClient.del('ProcessingRMA');
            redisClient.del('VerifiedRMA');
            redisClient.del('InProgressRMA');
            redisClient.del('ClosedRMA');
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('No RMAs found!');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.getAcceptedRMA = async (req, res) => {
    try {
        const Rma = await redisClient.get('AcceptedRMA');
        if (Rma !== null) {
            const redisresults = JSON.parse(Rma);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getAcceptedRMA();
        redisClient.set('AcceptedRMA', JSON.stringify(results[0]), { EX: 60 * 60 * 24 });
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('No Accepted RMAs found!');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.getInProgressChecklist = async (req, res) => {
    try {
        const Rma = await redisClient.get('ProcessingRMA');
        if (Rma !== null) {
            const redisresults = JSON.parse(Rma);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getInProgressChecklist();
        redisClient.set('ProcessingRMA', JSON.stringify(results[0]), { EX: 60 * 60 * 24 });
        if (results.length > 0) {
            redisClient.del('PendingRMA');
            redisClient.del('AcceptedRMA');
            redisClient.del('ReceivedRMA');
            redisClient.del('ProcessingRMA');
            redisClient.del('VerifiedRMA');
            redisClient.del('InProgressRMA');
            redisClient.del('ClosedRMA');
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('No RMAs in processing found!');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.getRejectedRMA = async (req, res) => {
    try {
        const Rma = await redisClient.get('RejectedRMA');
        if (Rma !== null) {
            const redisresults = JSON.parse(Rma);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getRejectedRMA();
        redisClient.set('RejectedRMA', JSON.stringify(results[0]), { EX: 60 * 60 * 24 });
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('No rejected RMAs found!');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.getReceivedRMA = async (req, res) => {
    try {
        const Rma = await redisClient.get('ReceivedRMA');
        if (Rma !== null) {
            const redisresults = JSON.parse(Rma);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getReceivedRMA();
        redisClient.set('ReceivedRMA', JSON.stringify(results[0]), { EX: 60 * 60 * 24 });
        if (results.length > 0) {
            redisClient.del('PendingRMA');
            redisClient.del('AcceptedRMA');
            redisClient.del('ReceivedRMA');
            redisClient.del('ProcessingRMA');
            redisClient.del('VerifiedRMA');
            redisClient.del('InProgressRMA');
            redisClient.del('ClosedRMA');
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('No received RMAs found!');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.getVerifiedRMA = async (req, res) => {
    try {
        const Rma = await redisClient.get('VerifiedRMA');
        if (Rma !== null) {
            const redisresults = JSON.parse(Rma);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getVerifiedRMA();
        redisClient.set('VerifiedRMA', JSON.stringify(results[0]), { EX: 60 * 60 * 24 });
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('No verified RMAs found!');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.getIPRMA = async (req, res) => {
    try {
        const Rma = await redisClient.get('InProgressRMA');
        if (Rma !== null) {
            const redisresults = JSON.parse(Rma);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getIPRMA();
        redisClient.set('InProgressRMA', JSON.stringify(results[0]), { EX: 60 * 60 * 24 });
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('No RMAs in progress found!');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.getClosedRMA = async (req, res) => {
    try {
        const Rma = await redisClient.get('ClosedRMA');
        if (Rma !== null) {
            const redisresults = JSON.parse(Rma);
            return res.status(200).json(redisresults);
        }
        const results = await rmaService.getClosedRMA();
        redisClient.set('ClosedRMA', JSON.stringify(results[0]), { EX: 60 * 60 * 24 });
        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('No closed RMAs found!');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

// Create RMA()
module.exports.newRMA = async (req, res) => {
    const { contactperson, contactno, salesmanid, contactemail, company, products } = req.body;
    try {
        const rmaProducts = products.map((product) => {
            return product;
        });
        const resultsrma = await rmaService.insertRMAData(
            contactperson,
            contactno,
            salesmanid,
            contactemail,
            company,
            rmaProducts
        );
        if (resultsrma.length > 0) {
            redisClient.del('allRMA');
            redisClient.del('PendingRMA');
            redisClient.del('AcceptedRMA');
            redisClient.del('ReceivedRMA');
            redisClient.del('ProcessingRMA');
            redisClient.del('VerifiedRMA');
            redisClient.del('InProgressRMA');
            redisClient.del('ClosedRMA');
            redisClient.del(`myPendingRMA#${salesmanid}`);
            redisClient.del(`myAcceptedRMA#${salesmanid}`);
            redisClient.del(`myRejectedRMA#${salesmanid}`);
            redisClient.del(`myIPRMA#${salesmanid}`);
            return res.status(200).json({ message: 'RMA successfully created' });
        }
        return res.status(500).json({ message: 'Could Not Create The RMA' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.updateRmaAccepted = async (req, res) => {
    const { RmaID } = req.params;
    try {
        const gettingInfo = await rmaService.getEmployeeInfo(RmaID);
        const userid = gettingInfo[0][0].UserID;
        const email = gettingInfo[0][0].Email.toString();
        const username = gettingInfo[0][0].Username.toString();
        const telegramid = gettingInfo[0][0].TelegramID?.toString();
        const results = await rmaService.getByRmaID(RmaID);
        if (results.length > 0) {
            await rmaService.updateRmaAccepted(RmaID);
            if (telegramid != null) {
                rmaAcceptedTele(telegramid, username, RmaID);
            }
            rmaAcceptedMail(email, username, RmaID);
            createNotification(12, userid, RmaID);

            redisClient.del('allRMA');
            redisClient.del(`rmaDetails#${RmaID}`);
            redisClient.del(`rmaProducts#${RmaID}`);
            redisClient.del(`rmaByRmaID#${RmaID}`);
            redisClient.del('PendingRMA');
            redisClient.del('AcceptedRMA');
            redisClient.del('ReceivedRMA');
            redisClient.del('ProcessingRMA');
            redisClient.del('VerifiedRMA');
            redisClient.del('InProgressRMA');
            redisClient.del('ClosedRMA');
            return res.status(204).json({ message: 'RMA accepted!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.updateRmaRejected = async (req, res) => {
    const { RmaID } = req.params;
    const { rejectreason } = req.body;
    try {
        const gettingInfo = await rmaService.getEmployeeInfo(RmaID);
        const userid = gettingInfo[0][0].UserID;
        const email = gettingInfo[0][0].Email.toString();
        const username = gettingInfo[0][0].Username.toString();
        const telegramid = gettingInfo[0][0].TelegramID?.toString();
        const results = await rmaService.getByRmaID(RmaID);
        if (results.length > 0) {
            await rmaService.updateRmaRejected(RmaID, rejectreason);
            if (telegramid != null) {
                rmaRejectedTele(telegramid, username, RmaID, rejectreason);
            }
            rmaRejectedMail(email, username, RmaID, rejectreason);
            createNotification(13, userid, RmaID);
            redisClient.del('allRMA');
            redisClient.del(`rmaDetails#${RmaID}`);
            redisClient.del(`rmaProducts#${RmaID}`);
            redisClient.del(`rmaByRmaID#${RmaID}`);
            redisClient.del('PendingRMA');
            redisClient.del('AcceptedRMA');
            redisClient.del('ReceivedRMA');
            redisClient.del('ProcessingRMA');
            redisClient.del('VerifiedRMA');
            redisClient.del('InProgressRMA');
            redisClient.del('ClosedRMA');
            return res.status(204).json({ message: 'RMA rejected!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.updateRmaChecklist = async (req, res) => {
    const { RmaID } = req.params;
    const { products } = req.body;
    try {
        const results = await rmaService.getByRmaID(RmaID);
        if (results.length > 0) {
            await rmaService.updateRmaChecklist(RmaID, products);
            redisClient.del('allRMA');
            redisClient.del(`rmaDetails#${RmaID}`);
            redisClient.del(`rmaProducts#${RmaID}`);
            redisClient.del(`rmaByRmaID#${RmaID}`);
            redisClient.del('PendingRMA');
            redisClient.del('AcceptedRMA');
            redisClient.del('ReceivedRMA');
            redisClient.del('ProcessingRMA');
            redisClient.del('VerifiedRMA');
            redisClient.del('InProgressRMA');
            redisClient.del('ClosedRMA');
            return res.status(204).json({ message: 'RMA checklist updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.updateRmaReceived = async (req, res) => {
    const { RmaID } = req.params;
    const { products } = req.body;
    try {
        const gettingInfo = await rmaService.getEmployeeInfo(RmaID);
        const email = gettingInfo[0][0].Email.toString();
        const userid = gettingInfo[0][0].UserID;
        const username = gettingInfo[0][0].Username.toString();
        const telegramid = gettingInfo[0][0].TelegramID?.toString();
        const results = await rmaService.getByRmaID(RmaID);
        if (results.length > 0) {
            await rmaService.updateRMAReceived(RmaID, products);
            if (telegramid != null) {
                rmaReceivedTele(telegramid, username, RmaID);
            }
            createNotification(17, userid, RmaID);
            rmaReceivedMail(email, username, RmaID);
            redisClient.del('allRMA');
            redisClient.del(`rmaDetails#${RmaID}`);
            redisClient.del(`rmaProducts#${RmaID}`);
            redisClient.del(`rmaByRmaID#${RmaID}`);
            redisClient.del('PendingRMA');
            redisClient.del('AcceptedRMA');
            redisClient.del('ReceivedRMA');
            redisClient.del('ProcessingRMA');
            redisClient.del('VerifiedRMA');
            redisClient.del('InProgressRMA');
            redisClient.del('ClosedRMA');
            return res.status(204).json({ message: 'RMA receival status updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.updateRmaInstructions = async (req, res) => {
    const { RmaID } = req.params;
    const { products } = req.body;
    try {
        const gettingInfo = await rmaService.getEmployeeInfo(RmaID);
        const email = gettingInfo[0][0].Email.toString();
        const userid = gettingInfo[0][0].UserID;
        const username = gettingInfo[0][0].Username.toString();
        const telegramid = gettingInfo[0][0].TelegramID?.toString();
        const results = await rmaService.getByRmaID(RmaID);
        if (results.length > 0) {
            await rmaService.updateRmaInstructions(RmaID, products);
            if (telegramid != null) {
                rmaVerifiedTele(telegramid, username, RmaID);
            }
            createNotification(18, userid, RmaID);
            rmaVerifiedMail(email, username, RmaID);
            redisClient.del('allRMA');
            redisClient.del(`rmaDetails#${RmaID}`);
            redisClient.del(`rmaProducts#${RmaID}`);
            redisClient.del(`rmaByRmaID#${RmaID}`);
            redisClient.del('PendingRMA');
            redisClient.del('AcceptedRMA');
            redisClient.del('ReceivedRMA');
            redisClient.del('ProcessingRMA');
            redisClient.del('VerifiedRMA');
            redisClient.del('InProgressRMA');
            redisClient.del('ClosedRMA');
            return res.status(200).json({ message: 'RMA instructions updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.updateRmaCoa = async (req, res) => {
    const { RmaID } = req.params;
    const { products } = req.body;
    try {
        const gettingInfo = await rmaService.getEmployeeInfo(RmaID);
        const email = gettingInfo[0][0].Email.toString();
        const userid = gettingInfo[0][0].UserID;
        const username = gettingInfo[0][0].Username.toString();
        const telegramid = gettingInfo[0][0].TelegramID?.toString();
        const results = await rmaService.getByRmaID(RmaID);
        if (results.length > 0) {
            await rmaService.updateRmaCOA(RmaID, products);
            if (telegramid != null) {
                rmaProgressTele(telegramid, username, RmaID);
            }
            createNotification(19, userid, RmaID);
            rmaInprogressMail(email, username, RmaID);
            redisClient.del('allRMA');
            redisClient.del(`rmaDetails#${RmaID}`);
            redisClient.del(`rmaProducts#${RmaID}`);
            redisClient.del(`rmaByRmaID#${RmaID}`);
            redisClient.del('PendingRMA');
            redisClient.del('AcceptedRMA');
            redisClient.del('ReceivedRMA');
            redisClient.del('ProcessingRMA');
            redisClient.del('VerifiedRMA');
            redisClient.del('InProgressRMA');
            redisClient.del('ClosedRMA');
            return res.status(200).json({ message: 'RMA COA updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.closeRma = async (req, res) => {
    const { RmaID } = req.params;
    try {
        const gettingInfo = await rmaService.getEmployeeInfo(RmaID);
        const email = gettingInfo[0][0].Email.toString();
        const userid = gettingInfo[0][0].UserID;
        const username = gettingInfo[0][0].Username.toString();
        const telegramid = gettingInfo[0][0].TelegramID?.toString();
        const results = await rmaService.getByRmaID(RmaID);
        if (results.length > 0) {
            await rmaService.closeRma(RmaID);
            if (telegramid != null) {
                rmaClosedTele(telegramid, username, RmaID);
            }
            rmaClosedMail(email, username, RmaID);
            createNotification(16, userid, RmaID);
            redisClient.del('allRMA');
            redisClient.del(`rmaDetails#${RmaID}`);
            redisClient.del(`rmaProducts#${RmaID}`);
            redisClient.del(`rmaByRmaID#${RmaID}`);
            redisClient.del('PendingRMA');
            redisClient.del('AcceptedRMA');
            redisClient.del('ReceivedRMA');
            redisClient.del('ProcessingRMA');
            redisClient.del('VerifiedRMA');
            redisClient.del('InProgressRMA');
            redisClient.del('ClosedRMA');
            return res.status(204).json({ message: 'RMA closed successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find RMA with that number' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
