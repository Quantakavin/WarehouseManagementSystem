const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { TOKEN } = process.env;

const bot = new TelegramBot(TOKEN, { polling: true });
bot.on('message', (message) => {
    UserID = message.bot.sendMessage(UserID, `This is a bot of ISDN Holdings.`);
});

module.exports.rmaAcceptedTele = (UserID, Username, RmaID) => {
    try {
        bot.sendMessage(
            UserID,
            `Hello ${Username}, your RMA request #${RmaID} has just been approved, view the details at http://localhost:3000/rmaDetails/${RmaID}`
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports.rmaRejectedTele = (UserID, Username, RmaID, RejectReason) => {
    try {
        bot.sendMessage(
            UserID,
            `Hello ${Username}, your RMA request #${RmaID} has just been rejected, view the details at http://localhost:3000/rmaDetails/${RmaID}`
        );
        bot.sendMessage(UserID, `Reason: ${RejectReason}`);
    } catch (error) {
        console.log(error);
    }
};

module.exports.rmaReceivedTele = (UserID, Username, RmaID) => {
    try {
        bot.sendMessage(
            UserID,
            `Hello ${Username}, the products for your RMA request #${RmaID} have just been received,`
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports.rmaVerifiedTele = (UserID, Username, RmaID) => {
    try {
        bot.sendMessage(
            UserID,
            `Hello ${Username}, the products for your RMA request #${RmaID} have just been verified,`
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports.rmaProgressTele = (UserID, Username, RmaID) => {
    try {
        bot.sendMessage(
            UserID,
            `Hello ${Username}, progress for your RMA request #${RmaID} has just been updated, view the details at http://localhost:3000/rmaDetails/${RmaID}`
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports.rmaClosedTele = (UserID, Username, RmaID) => {
    try {
        bot.sendMessage(
            UserID,
            `Hello ${Username}, your RMA request #${RmaID} has just been closed,`
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports.tloanAcceptedTele = (UserID, Username, TLoanID) => {
    try {
        bot.sendMessage(
            UserID,
            `Hello ${Username}, your T-Loan request #${TLoanID} has just been approved, view the details at http://localhost:3000/tloandetails/${TLoanID}`
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports.tloanRejectedTele = (UserID, Username, TLoanID, Remarks) => {
    try {
        bot.sendMessage(
            UserID,
            `Hello ${Username}, your T-Loan request #${TLoanID} has just been rejected, Remarks: ${Remarks}`
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports.tloanExtensionAcceptedTele = (UserID, Username, TLoanID) => {
    try {
        bot.sendMessage(
            UserID,
            `Hello ${Username}, your Extension request for T-Loan #${TLoanID} has just been approved, view the details at http://localhost:3000/tloandetails/${TLoanID}`
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports.tloanExtensionRejectedTele = (UserID, Username, TLoanID, Remarks) => {
    try {
        bot.sendMessage(
            UserID,
            `Hello ${Username}, your Extension request for T-Loan #${TLoanID} has just been rejected, Remarks: ${Remarks}`
        );
    } catch (error) {
        console.log(error);
    }
};
