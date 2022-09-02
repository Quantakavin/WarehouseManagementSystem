const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { TOKEN } = process.env;
const bot = new TelegramBot(TOKEN, { polling: true });
const isdnlogo =
    'https://www.pngitem.com/pimgs/m/621-6213396_isdn-holdings-limited-isdn-holdings-logo-hd-png.png';
/* eslint-disable no-console */

// const tloanoptions = {
//     reply_markup: JSON.stringify({
//         inline_keyboard: [
//             [{ text: 'Status', callback_data: '4' }],
//             [{ text: 'Progress', callback_data: '5' }],
//             [{ text: 'Customer Details', callback_data: '6' }]
//         ]
//     })
// };

// const { rmaService } = require('../services');

// const options = {
//     reply_markup: JSON.stringify({
//         inline_keyboard: [
//             [{ text: 'Status', callback_data: '1' }],
//             [{ text: 'Progress', callback_data: '2' }],
//             [{ text: 'Customer Details', callback_data: '3' }]
//         ]
//     })
// };

// bot.on('message', (message) => {
//     const UserID = message.chat.id;
//     if (message.text === 'RMA') {
//         bot.sendMessage(UserID, `RMA Request Options`, options);
//         bot.on('callback_query', function onCallbackQuery(callbackQuery) {
//             const action = callbackQuery.data;
//             const msg = callbackQuery.message;
//             const opts = {
//                 chat_id: msg.chat.id,
//                 message_id: msg.message_id
//             };
//             let text;

//             switch (action) {
//                 case '1': {
//                     bot.sendMessage(UserID, `Please provide an RmaID`);
//                     bot.on('message', async (rmaid) => {
//                         const RmaID = rmaid.text;
//                         const results = await rmaService.getByRmaID(RmaID);
//                         const status = results[0][0].StatusText;
//                         bot.sendMessage(UserID, `Status of RMA #${RmaID} is ${status}`);
//                     });
//                     break;
//                 }
//                 case '2': {
//                     bot.sendMessage(
//                         UserID,
//                         `Current Progress for RMA #108: On the way to supplier`
//                     );
//                     break;
//                 }
//                 case '3': {
//                     bot.sendMessage(UserID, `Customer Name: Shine Tan, Customer Contact: 96963677`);
//                     break;
//                 }
//                 default: {
//                     bot.sendMessage(UserID, `Answer`, options);
//                 }
//             }
//             bot.editMessageText(text, opts);
//         });
//     }
// });

module.exports.rmaAcceptedTele = (UserID, Username, RmaID) => {
    try {
        bot.sendPhoto(UserID, isdnlogo, {
            caption: `Hello ${Username}, your RMA request #${RmaID} has just been approved, view the details at https://isdnwarehouse.netlify.app/rmaDetails/${RmaID}`
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports.rmaRejectedTele = (UserID, Username, RmaID, RejectReason) => {
    try {
        console.log('Among Us');
        bot.sendPhoto(UserID, isdnlogo, {
            caption: `Hello ${Username}, your RMA request #${RmaID} has just been rejected, view the details at https://isdnwarehouse.netlify.app/rmaDetails/${RmaID}`
        });
        bot.sendMessage(UserID, `Reason: ${RejectReason}`);
    } catch (error) {
        console.log('Among Us');
        console.log(error);
    }
};

module.exports.rmaReceivedTele = (UserID, Username, RmaID) => {
    try {
        bot.sendPhoto(UserID, isdnlogo, {
            caption: `Hello ${Username}, the products for your RMA request #${RmaID} have just been received, view the details at https://isdnwarehouse.netlify.app/rmaDetails/${RmaID}`
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports.rmaVerifiedTele = (UserID, Username, RmaID) => {
    try {
        bot.sendPhoto(UserID, isdnlogo, {
            caption: `Hello ${Username}, the products for your RMA request #${RmaID} have just been verified, view the details at https://isdnwarehouse.netlify.app/rmaDetails/${RmaID}`
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports.rmaProgressTele = (UserID, Username, RmaID) => {
    try {
        bot.sendPhoto(UserID, isdnlogo, {
            caption: `Hello ${Username}, progress for your RMA request #${RmaID} has just been updated, view the details at https://isdnwarehouse.netlify.app/rmaDetails/${RmaID}`
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports.rmaClosedTele = (UserID, Username, RmaID) => {
    try {
        bot.sendPhoto(UserID, isdnlogo, {
            caption: `Hello ${Username}, your RMA request #${RmaID} has just been closed,`
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports.tloanAcceptedTele = (UserID, Username, TLoanID) => {
    try {
        bot.sendPhoto(UserID, isdnlogo, {
            caption: `Hello ${Username}, your T-Loan request #${TLoanID} has just been approved, view the details at https://isdnwarehouse.netlify.app/tloandetails/${TLoanID}`
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports.tloanRejectedTele = (UserID, Username, TLoanID, Remarks) => {
    try {
        bot.sendPhoto(UserID, isdnlogo, {
            caption: `Hello ${Username}, your T-Loan request #${TLoanID} has just been rejected`
        });
        bot.sendMessage(UserID, `Reason: ${Remarks}`);
    } catch (error) {
        console.log(error);
    }
};

module.exports.tloanExtensionAcceptedTele = (UserID, Username, TLoanID) => {
    try {
        bot.sendPhoto(UserID, isdnlogo, {
            caption: `Hello ${Username}, your Extension request for T-Loan #${TLoanID} has just been approved, view the details at https://isdnwarehouse.netlify.app/tloandetails/${TLoanID}`
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports.tloanExtensionRejectedTele = (UserID, Username, TLoanID, Remarks) => {
    try {
        bot.sendPhoto(UserID, isdnlogo, {
            caption: `Hello ${Username}, your Extension request for T-Loan #${TLoanID} has just been rejected`
        });
        bot.sendMessage(UserID, `Remarks: ${Remarks}`);
    } catch (error) {
        console.log(error);
    }
};
