const TLoan = require('../services/tLoanService');
const redisClient = require('../config/caching');
const { tloanAcceptedMail, tloanRejectedMail, tloanExtensionAcceptedMail, tloanExtensionRejectedMail } = require('./emailNotificationController');

module.exports.getLoanByNo = async (req, res) => {
    const { TLoanID } = req.params;
    try {
        const loanDetail = await redisClient.get(`TLoan#${TLoanID}`);
        if (loanDetail !== null) {
            const redisresults = JSON.parse(loanDetail);
            return res.status(200).json(redisresults);
        }
        let output = [];
        const results = await TLoan.getLoanByNumber(TLoanID);
        if (results[0].length > 0) {
            [output] = results;
            const IDOfTLoan = results[0][0].TLoanID;
            const results2 = await TLoan.getTLoanOutItem(IDOfTLoan);
            console.log(output);
            if (results2.length > 0) {
                [output[0].Items] = results2;
                output = output[0];
            }
            redisClient.set(`TLoan#${TLoanID}`, JSON.stringify(output), {
                EX: 60 * 10
            });
            return res.status(200).send(output);
        }
        return res.status(404).json({ message: 'Cannot find' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getItemsByTloan = async (req, res) => {
    const { TLoanID } = req.params;
    try {
        const TLoanItems = await redisClient.get(`TLoanItems#${TLoanID}`);
        if (TLoanItems !== null) {
            const redisresults = JSON.parse(TLoanItems);
            return res.status(200).json(redisresults);
        }
        // const results1 = await TLoan.getLoanByNumber(TLoanID);
        // const IDOfTLoan = results1[0][0].TLoanID;
        const results = await TLoan.getTLoanOutItem(TLoanID);
        if (results.length > 0) {
            redisClient.set(`TLoanItems#${TLoanID}`, JSON.stringify(results[0]), {
                EX: 60 * 10
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('This TLoan has no items');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.getIDofLoan = async (req, res) => {
    const { TLoanID } = req.params;
    try {
        const TLoanIDs = await redisClient.get(`TLoanIDs#${TLoanID}`);
        if (TLoanIDs !== null) {
            const redisresults = JSON.parse(TLoanIDs);
            return res.status(200).json(redisresults);
        }

        const results = await TLoan.getID(TLoanID);
        if (results.length > 0) {
            redisClient.set(`TLoanIDs#${TLoanID}`, JSON.stringify(results[0]), {
                EX: 60 * 10
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('There is no ID');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.allLoan = async (req, res) => {
    try {
        const TLoans = await redisClient.get('AllTLoans');
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getAll();

        if (results.length > 0) {
            redisClient.set('AllTLoans', JSON.stringify(results[0]), {
                EX: 60 * 60 * 2
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('You have not made any TLoans');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.SubmitAfterEdit = async (req, res) => {
    const { TLoanID } = req.params;
    const {
        type,
        company,
        purpose,
        applicationdate,
        duration,
        requireddate,
        email,
        collection,
        items
    } = req.body;

    try {
        const gettingInfo = await TLoan.getEmployeeEmail(TLoanID)
        const UserID = (gettingInfo[0][0].UserID).toString()
        const results = await TLoan.getLoanByNumber(TLoanID);
        const tloanItems = items.map((item) => {
            return item;
        });

        if (results.length > 0) {
            await TLoan.DeleteProductsByID(TLoanID);
            await TLoan.SubmitAfterEdit(
                TLoanID,
                type,
                company,
                purpose,
                applicationdate,
                duration,
                requireddate,
                email,
                collection,
                tloanItems
            );
            // await TLoan.TLoanOutByID(
            //     TLoanID,
            //     itemno,
            //     itemname,
            //     quantity,
            //     batchno,
            //     warehousecode,
            //     basketitemid)
            redisClient.del(`TLoanItems#${TLoanID}`);
            redisClient.del(`TLoan#${TLoanID}`);
            redisClient.del(`TLoanIDs#${TLoanID}`);
            redisClient.del('ManagerLoan');
            redisClient.del('ManagerExtension');
            redisClient.del(`TLoanStatusID#${TLoanID}`);
            redisClient.del(`ExtensionStatus#${TLoanID}`);
            redisClient.del(`CurrentTLoan#${UserID}`);
            redisClient.del(`PendingTLoan#${UserID}`);
            redisClient.del(`DraftTLoan#${UserID}`);
            redisClient.del(`HistoryTLoan#${UserID}`);
            
            return res.status(200).send('Draft has been submitted');
        }
        return res.status(500).send('Submit draft failed');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.DraftAfterEdit = async (req, res) => {
    const { TLoanID } = req.params;
    const {
        type,
        company,
        purpose,
        applicationdate,
        duration,
        requireddate,
        email,
        collection,
        items
    } = req.body;

    try {
        const gettingInfo = await TLoan.getEmployeeEmail(TLoanID)
        const UserID = (gettingInfo[0][0].UserID).toString()
        const results = await TLoan.getLoanByNumber(TLoanID);
        const tloanItems = items.map((item) => {
            return item;
        });

        if (results.length > 0) {
            await TLoan.DeleteProductsByID(TLoanID);
            await TLoan.DraftAfterEdit(
                TLoanID,
                type,
                company,
                purpose,
                applicationdate,
                duration,
                requireddate,
                email,
                collection,
                tloanItems
            );
            // await TLoan.TLoanOutByID(
            //     TLoanID,
            //     itemno,
            //     itemname,
            //     quantity,
            //     batchno,
            //     warehousecode,
            //     basketitemid)
            redisClient.del(`TLoanItems#${TLoanID}`);
            redisClient.del(`TLoan#${TLoanID}`);
            redisClient.del(`TLoanIDs#${TLoanID}`);
            redisClient.del('ManagerLoan');
            redisClient.del(`TLoanStatusID#${TLoanID}`);
            redisClient.del(`ExtensionStatus#${TLoanID}`);
            redisClient.del('ManagerExtension');
            redisClient.del(`CurrentTLoan#${UserID}`);
            redisClient.del(`PendingTLoan#${UserID}`);
            redisClient.del(`DraftTLoan#${UserID}`);
            redisClient.del(`HistoryTLoan#${UserID}`);
            return res.status(200).send('Draft has been saved');
        }
        return res.status(500).send('Draft failed to save');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.newLoan = async (req, res) => {
    const { TLoanID } = req.params;
    const {
        type,
        company,
        name,
        purpose,
        applicationdate,
        duration,
        requireddate,
        user,
        email,
        collection,
        items
    } = req.body;
    try {
        const gettingInfo = await TLoan.getEmployeeEmail(TLoanID)
        const UserID = (gettingInfo[0][0].UserID).toString()
        const tloanItems = items.map((item) => {
            return item;
        });
        await TLoan.createTLoan(
            type,
            company,
            name,
            purpose,
            applicationdate,
            duration,
            requireddate,
            user,
            email,
            collection,
            tloanItems
        );
        redisClient.del(`TLoanItems#${TLoanID}`);
        redisClient.del(`TLoan#${TLoanID}`);
        redisClient.del(`TLoanIDs#${TLoanID}`);
        redisClient.del('ManagerLoan');
        redisClient.del('ManagerExtension');
        redisClient.del(`TLoanStatusID#${TLoanID}`);
        redisClient.del(`ExtensionStatus#${TLoanID}`);
        redisClient.del(`CurrentTLoan#${UserID}`);
        redisClient.del(`PendingTLoan#${UserID}`);
        redisClient.del(`DraftTLoan#${UserID}`);
        redisClient.del(`HistoryTLoan#${UserID}`);
        return res.status(201).json(tloanItems);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.SendDraft = async (req, res) => {
    const { TLoanID } = req.params;
    const {
        type,
        company,
        name,
        purpose,
        applicationdate,
        duration,
        requireddate,
        user,
        email,
        collection,
        items
    } = req.body;
    try {
        const gettingInfo = await TLoan.getEmployeeEmail(TLoanID)
        const UserID = (gettingInfo[0][0].UserID).toString()
        const tloanItems = items.map((item) => {
            return item;
        });
        await TLoan.SendTLoanToDraft(
            type,
            company,
            name,
            purpose,
            applicationdate,
            duration,
            requireddate,
            user,
            email,
            collection,
            tloanItems
        );
        redisClient.del(`TLoanItems#${TLoanID}`);
        redisClient.del(`TLoan#${TLoanID}`);
        redisClient.del(`TLoanIDs#${TLoanID}`);
        redisClient.del('ManagerLoan');
        redisClient.del('ManagerExtension');
        redisClient.del(`TLoanStatusID#${TLoanID}`);
        redisClient.del(`ExtensionStatus#${TLoanID}`);
        redisClient.del(`CurrentTLoan#${UserID}`);
        redisClient.del(`PendingTLoan#${UserID}`);
        redisClient.del(`DraftTLoan#${UserID}`);
        redisClient.del(`HistoryTLoan#${UserID}`);
        return res.status(201).json(tloanItems);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.currentLoan = async (req, res) => {
    const { UserID } = req.params;

    try {
        const TLoans = await redisClient.get(`CurrentTLoan#${UserID}`);
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getCurrent(UserID);
        if (results.length > 0) {
            redisClient.set(`CurrentTLoan#${UserID}`, JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('You have not made any TLoans');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.draftsLoan = async (req, res) => {
    const { UserID } = req.params;
    try {
        const TLoans = await redisClient.get(`DraftTLoan#${UserID}`);
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getDraft(UserID);
        if (results.length > 0) {
            redisClient.set(`DraftTLoan#${UserID}`, JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('You have not made any TLoans');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.historyLoan = async (req, res) => {
    const { UserID } = req.params;
    try {
        const TLoans = await redisClient.get(`HistoryTLoan#${UserID}`);
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getHistory(UserID);
        if (results.length > 0) {
            redisClient.set(`HistoryTLoan#${UserID}`, JSON.stringify(results[0]));
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('You have not made any TLoans');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.pendingLoan = async (req, res) => {
    const { UserID } = req.params;
    try {
        const TLoans = await redisClient.get(`PendingTLoan#${UserID}`);
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getPending(UserID);
        if (results.length > 0) {
            redisClient.set(`PendingTLoan#${UserID}`, JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('You have not made any TLoans');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.approveLoan = async (req, res) => {
    const { TLoanID } = req.params;
    try {
        const gettingInfo = await TLoan.getEmployeeEmail(TLoanID)
        const email = (gettingInfo[0][0].Email).toString()
        const username = (gettingInfo[0][0].Username).toString()
        const UserID = (gettingInfo[0][0].UserID).toString()
        const results = await TLoan.approveLoan(TLoanID);
        if (results) {
        tloanAcceptedMail(email, username, TLoanID);
            redisClient.del('ManagerLoan');
            redisClient.del('ManagerExtension');
            redisClient.del('ApprovedLoan');
            redisClient.del(`TLoanItems#${TLoanID}`);
            redisClient.del(`TLoan#${TLoanID}`);
            redisClient.del(`TLoanIDs#${TLoanID}`);
            redisClient.del(`TLoanStatusID#${TLoanID}`);
            redisClient.del(`ExtensionStatus#${TLoanID}`);
            redisClient.del(`CurrentTLoan#${UserID}`);
            redisClient.del(`PendingTLoan#${UserID}`);
            redisClient.del(`DraftTLoan#${UserID}`);
            redisClient.del(`HistoryTLoan#${UserID}`);
            return res.status(200).send('Status has been Updated');
        }
        return res.status(500).send('Status failed to Update');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.rejectLoan = async (req, res) => {
    const { TLoanID } = req.params;
    const { remarks } = req.body;
    try {
        const gettingInfo = await TLoan.getEmployeeEmail(TLoanID)
        const email = (gettingInfo[0][0].Email).toString()
        const username = (gettingInfo[0][0].Username).toString()
        const UserID = (gettingInfo[0][0].UserID).toString()
        const results = await TLoan.getLoanByNumber(TLoanID);
        if (results.length > 0) {
            tloanRejectedMail(email, username, TLoanID, remarks);
            redisClient.del('ManagerLoan');
            redisClient.del('ManagerExtension');
            redisClient.del(`TLoanItems#${TLoanID}`);
            redisClient.del(`TLoan#${TLoanID}`);
            redisClient.del(`TLoanIDs#${TLoanID}`);
            redisClient.del(`TLoanStatusID#${TLoanID}`);
            redisClient.del(`ExtensionStatus#${TLoanID}`);
            redisClient.del(`CurrentTLoan#${UserID}`);
            redisClient.del(`PendingTLoan#${UserID}`);
            redisClient.del(`DraftTLoan#${UserID}`);
            redisClient.del(`HistoryTLoan#${UserID}`);
            await TLoan.rejectLoan(TLoanID, remarks);
            return res.status(200).send('Status has been Updated');
        }
        return res.status(500).send('Status failed to Update');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.approveExtension = async (req, res) => {
    const { TLoanID } = req.params;
    try {
        const gettingInfo = await TLoan.getEmployeeEmail(TLoanID)
        const email = (gettingInfo[0][0].Email).toString()
        const username = (gettingInfo[0][0].Username).toString()
        const UserID = (gettingInfo[0][0].UserID).toString()
        const results = await TLoan.approveExtension(TLoanID);
        if (results) {
            tloanExtensionAcceptedMail(email, username, TLoanID);
            redisClient.del('ManagerLoan');
            redisClient.del('ManagerExtension');
            redisClient.del(`TLoanItems#${TLoanID}`);
            redisClient.del(`TLoan#${TLoanID}`);
            redisClient.del(`TLoanIDs#${TLoanID}`);
            redisClient.del(`TLoanStatusID#${TLoanID}`);
            redisClient.del(`ExtensionStatus#${TLoanID}`);
            redisClient.del(`CurrentTLoan#${UserID}`);
            redisClient.del(`PendingTLoan#${UserID}`);
            redisClient.del(`DraftTLoan#${UserID}`);
            redisClient.del(`HistoryTLoan#${UserID}`);
            return res.status(200).send('Status has been Updated');
        }
        return res.status(500).send('Status failed to Update');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.rejectExtension = async (req, res) => {
    const { TLoanID } = req.params;
    const { remarks } = req.body;
    try {
        const gettingInfo = await TLoan.getEmployeeEmail(TLoanID)
        const email = (gettingInfo[0][0].Email).toString()
        const username = (gettingInfo[0][0].Username).toString()
        const UserID = (gettingInfo[0][0].UserID).toString()
        const results = await TLoan.getLoanByNumber(TLoanID);
        if (results.length > 0) {
            tloanExtensionRejectedMail(email, username, TLoanID, remarks);
            redisClient.del('ManagerLoan');
            redisClient.del('ManagerExtension');
            redisClient.del(`TLoanItems#${TLoanID}`);
            redisClient.del(`TLoan#${TLoanID}`);
            redisClient.del(`TLoanIDs#${TLoanID}`);
            redisClient.del(`TLoanStatusID#${TLoanID}`);
            redisClient.del(`ExtensionStatus#${TLoanID}`);
            redisClient.del(`CurrentTLoan#${UserID}`);
            redisClient.del(`PendingTLoan#${UserID}`);
            redisClient.del(`DraftTLoan#${UserID}`);
            redisClient.del(`HistoryTLoan#${UserID}`);
            await TLoan.rejectExtension(TLoanID, remarks);
            return res.status(200).send('Status has been Updated');
        }
        return res.status(500).send('Status failed to Update');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

// module.exports.pickingLoan = async (req, res) => {
//     const { number } = req.body;
//     try {
//         const results = await TLoan.pickLoan(number);
//         if (results) {
//             return res.status(200).send('Status has been Updated');
//         } else {
//             return res.status(500).send('Status failed to Update');
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send('Internal Server Error');
//     }
// };

// module.exports.issuedLoan = async (req, res) => {
//     const { number } = req.body;
//     try {
//         const results = await TLoan.issuedLoan(number);
//         if (results) {
//             return res.status(200).send('Status has been Updated');
//         } else {
//             return res.status(500).send('Status failed to Update');
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send('Internal Server Error');
//     }
// };

// module.exports.dueLoan = async (req, res) => {
//     const { number } = req.body;
//     try {
//         const results = await TLoan.dueLoan(number);
//         if (results) {
//             return res.status(200).send('Status has been Updated');
//         } else {
//             return res.status(500).send('Status failed to Update');
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send('Internal Server Error');
//     }
// };

// module.exports.readyLoan = async (req, res) => {
//     const { number } = req.body;
//     try {
//         const results = await TLoan.readyLoan(number);
//         if (results) {
//             return res.status(200).send('Status has been Updated');
//         } else {
//             return res.status(500).send('Status failed to Update');
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send('Internal Server Error');
//     }
// };

// module.exports.draftLoan = async (req, res) => {
//     const { number } = req.body;
//     try {
//         const results = await TLoan.draftLoan(number);
//         if (results) {
//             return res.status(200).send('Status has been Updated');
//         } else {
//             return res.status(500).send('Status failed to Update');
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send('Internal Server Error');
//     }
// };

module.exports.ManagerLoan = async (req, res) => {
    try {
        const TLoans = await redisClient.get('ManagerLoan');
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getManagerLoan();
        if (results.length > 0) {
            redisClient.set('ManagerLoan', JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('No Loans that are in need of approval');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.ManagerExtension = async (req, res) => {
    try {
        const TLoans = await redisClient.get('ManagerExtension');
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getManagerExtension();
        redisClient.set('ManagerExtension', JSON.stringify(results[0]));
        if (results.length > 0) {
            redisClient.set('ManagerExtension', JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('No Extensions that are in need of approval');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.LoanExtend = async (req, res) => {
    const {TLoanID, duration, reason } = req.body;
    try {
        const gettingInfo = await TLoan.getEmployeeEmail(TLoanID)
        const UserID = (gettingInfo[0][0].UserID).toString()
        const results = await TLoan.loanExtension(TLoanID, duration, reason);

        if (results.length > 0) {
            redisClient.del(`TLoanItems#${TLoanID}`);
            redisClient.del(`TLoan#${TLoanID}`);
            redisClient.del(`TLoanIDs#${TLoanID}`);
            redisClient.del('ManagerLoan');
            redisClient.del('ManagerExtension');
            redisClient.del(`TLoanStatusID#${TLoanID}`);
            redisClient.del(`ExtensionStatus#${TLoanID}`);
            redisClient.del(`CurrentTLoan#${UserID}`);
            redisClient.del(`PendingTLoan#${UserID}`);
            redisClient.del(`DraftTLoan#${UserID}`);
            redisClient.del(`HistoryTLoan#${UserID}`);
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('Could not submit extension request');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.extensionStatus = async (req, res) => {
    const { TLoanID } = req.params;
    try {
        const TLoans = await redisClient.get(`ExtensionStatus#${TLoanID}`);
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getExtensionStatus(TLoanID);
        if (results.length > 0) {
            redisClient.set(`ExtensionStatus#${TLoanID}`, JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(500).send('Does not Exist!');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.getApprovedLoan = async (req, res) => {
    try {
        const TLoans = await redisClient.get('ApprovedLoan');
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getApproved();
        if (results.length > 0) {
            redisClient.set('ApprovedLoan', JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('No approved Loans available');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.tloanStatusID = async (req, res) => {
    const { TLoanID } = req.params;
    try {
        const TLoans = await redisClient.get(`TLoanStatusID#${TLoanID}`);
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.getStatusID(TLoanID);
        if (results.length > 0) {
            redisClient.set(`TLoanStatusID#${TLoanID}`, JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(500).send('Does not Exist!');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.allCurrent = async (req, res) => {
    try {
        const TLoans = await redisClient.get('AllCurrent');
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.allCurrent();
        if (results.length > 0) {
            redisClient.set('AllCurrent', JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(500).send('Does not Exist!');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.allHistory = async (req, res) => {
    try {
        const TLoans = await redisClient.get('AllHistory');
        if (TLoans !== null) {
            const redisresults = JSON.parse(TLoans);
            return res.status(200).json(redisresults);
        }
        const results = await TLoan.allHistory();
        if (results.length > 0) {
            redisClient.set('AllHistory', JSON.stringify(results[0]), {
                EX: 60 * 5
            });
            return res.status(200).json(results[0]);
        }
        return res.status(500).send('Does not Exist!');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.updateStatus = async (req, res) => {
    const { TLoanID } = req.params;
    const { statusChange } = req.body;
    try {
        const gettingInfo = await TLoan.getEmployeeEmail(TLoanID)
        const UserID = (gettingInfo[0][0].UserID).toString()
        const results = await TLoan.updateStatus(TLoanID, statusChange);
        if (results) {
            redisClient.del('ApprovedLoan');
            redisClient.del(`TLoanItems#${TLoanID}`);
            redisClient.del(`TLoan#${TLoanID}`);
            redisClient.del(`TLoanIDs#${TLoanID}`);
            redisClient.del('ManagerLoan');
            redisClient.del('ManagerExtension');
            redisClient.del(`CurrentTLoan#${UserID}`);
            redisClient.del(`PendingTLoan#${UserID}`);
            redisClient.del(`DraftTLoan#${UserID}`);
            redisClient.del(`HistoryTLoan#${UserID}`);
            return res.status(200).send('Status has been Updated');
        }
        return res.status(500).send('Status failed to Update');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.getEmail = async (req, res) =>{
    const {TLoanID} = req.body
    try{
        const results = await TLoan.getEmployeeEmail(TLoanID)
        if(results) {
          return res.status(200).send(results[0][0].Email)
        }
    }catch (error){
        console.log(error)
    }
    
}