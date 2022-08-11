const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { TOKEN } = process.env;
const bot = new TelegramBot(TOKEN, { polling: true });
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

// const tloanoptions = {
//     reply_markup: JSON.stringify({
//         inline_keyboard: [
//             [{ text: 'Status', callback_data: '4' }],
//             [{ text: 'Progress', callback_data: '5' }],
//             [{ text: 'Customer Details', callback_data: '6' }]
//         ]
//     })
// };

// bot.on('message', (message) => {
//     let progressmarker;
//     const UserID = message.chat.id;
//     if (!progressmarker) {
//         if (message.text === 'RMA') {
//             bot.sendMessage(UserID, `RMA Request Options`, options);
//             bot.on('callback_query', function onCallbackQuery(callbackQuery) {
//                 console.log(progressmarker);
//                 const action = callbackQuery.data;
//                 const msg = callbackQuery.message;
//                 const opts = {
//                     chat_id: msg.chat.id,
//                     message_id: msg.message_id
//                 };
//                 let text;

//                 switch (action) {
//                     case '1': {
//                         console.log(progressmarker);
//                         bot.sendMessage(UserID, `Please provide an RmaID`);
//                         bot.on('message', async (rmaid) => {
//                             console.log(progressmarker);
//                             progressmarker = true;
//                             const RmaID = rmaid.text;
//                             // if (progressmarker === '1') {
//                             const results = await rmaService.getByRmaID(RmaID);
//                             const status = results[0][0].StatusText;
//                             bot.sendMessage(UserID, `Status of RMA #${RmaID} is ${status}`);
//                             console.log(progressmarker);
//                             // } else {
//                             //     bot.sendMessage(UserID, `Closed`);
//                             //     progressmarker = '1';
//                             // }
//                         });
//                         break;
//                     }
//                     case '2': {
//                         bot.sendMessage(
//                             UserID,
//                             `Current Progress for RMA #108: On the way to supplier`
//                         );
//                         break;
//                     }
//                     case '3': {
//                         bot.sendMessage(
//                             UserID,
//                             `Customer Name: Shine Tan, Customer Contact: 96963677`
//                         );
//                         break;
//                     }
//                     default: {
//                         bot.sendMessage(UserID, `Answer`, options);
//                     }
//                 }
//                 bot.editMessageText(text, opts);
//             });
//         }
//     } else if (progressmarker === true) {
//         bot.sendMessage(UserID, `Closed query`);
//     }
//     //  else if (message.text === 'TLoan') {
//     //     bot.sendMessage(UserID, `T-Loan Options`, tloanoptions);
//     //     bot.on('callback_query', function onCallbackQuery(callbackQuery) {
//     //         const action = callbackQuery.data;
//     //         const msg = callbackQuery.message;
//     //         const opts = {
//     //             chat_id: msg.chat.id,
//     //             message_id: msg.message_id
//     //         };
//     //         let text;

//     //         switch (action) {
//     //             case '4': {
//     //                 bot.sendMessage(UserID, `Status of T-Loan #108 is Approved`);
//     //                 break;
//     //             }
//     //             case '5': {
//     //                 bot.sendMessage(
//     //                     UserID,
//     //                     `Current Progress for T-Loan #108: On the way to supplier`
//     //                 );
//     //                 break;
//     //             }
//     //             case '6': {
//     //                 bot.sendMessage(UserID, `Customer Name: Shine Tan, Customer Contact: 96963677`);
//     //                 break;
//     //             }
//     //             default: {
//     //                 bot.sendMessage(UserID, `Answer.`, options);
//     //             }
//     //         }

//     //         bot.editMessageText(text, opts);
//     //     });
//     // } else {
//     //     bot.sendMessage(UserID, 'Please enter a valid query');
//     // }
// });

module.exports.rmaAcceptedTele = (UserID, Username, RmaID) => {
    try {
        bot.sendMessage(
            UserID,
            `Hello ${Username}, your RMA request #${RmaID} has just been approved, view the details at https://isdnwarehouse.netlify.app/rmaDetails/${RmaID}`
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports.rmaRejectedTele = (UserID, Username, RmaID, RejectReason) => {
    try {
        console.log('Among Us');
        bot.sendMessage(
            UserID,
            `Hello ${Username}, your RMA request #${RmaID} has just been rejected, view the details at https://isdnwarehouse.netlify.app/rmaDetails/${RmaID}`
        );
        bot.sendMessage(UserID, `Reason: ${RejectReason}`);
    } catch (error) {
        console.log('Among Us');
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
            `Hello ${Username}, progress for your RMA request #${RmaID} has just been updated, view the details at https://isdnwarehouse.netlify.app/rmaDetails/${RmaID}`
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
            `Hello ${Username}, your T-Loan request #${TLoanID} has just been approved, view the details at https://isdnwarehouse.netlify.app/tloandetails/${TLoanID}`
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
            `Hello ${Username}, your Extension request for T-Loan #${TLoanID} has just been approved, view the details at https://isdnwarehouse.netlify.app/tloandetails/${TLoanID}`
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
