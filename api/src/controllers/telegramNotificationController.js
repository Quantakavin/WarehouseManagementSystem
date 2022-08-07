const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { TOKEN } = process.env;

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', () => {
    const UserID = '615889365';
    bot.sendMessage(UserID, `Hello poopbutt`);
});
// const TELEGRAM_API=`https://api.telegram/org/bot${TOKEN}`
// const URI = `/webhook/${TOKEN}`
// const WEBHOOK_URL

// https://api.telegram.org/bot5584416213:AAFMk5KzT-_Gi3tZ0_7zkCyR3AjqZYXd2aU/sendMessage?chat_id=5584416213&text=Hello+World

// dotenv.config({ path: path.resolve(__dirname, '../../.env') });
// const apiKey = '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'
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// module.exports.rmaAcceptedMail = (email, username, RmaID) => {
//     sgMail
//         .send({
//             from: 'shine.thw@gmail.com', // Change to your verified sender
//             subject: 'RMA Approved',
//             templateId: 'd-1c4b7d2230ea47f2997c87dbc696a875',
//             personalizations: [
//                 {
//                     to: email,
//                     dynamicTemplateData: {
//                         Username: username,
//                         RmaID,
//                         URL: `http://localhost:3000/rmaDetails/${RmaID}`
//                     }
//                 }
//             ]
//         })
//         .then(() => {
//             console.log('Email sent');
//         })
//         .catch((error) => {
//             console.error(error);
//         });
// };
