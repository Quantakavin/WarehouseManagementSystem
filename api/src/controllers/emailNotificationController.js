const dotenv = require('dotenv');
const path = require('path');
const { TLoanOutByID } = require('../services/tLoanService');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const sgMail = require('@sendgrid/mail');
// const apiKey = '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'
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.rmaAcceptedMail = (
    email = 'shine.thw@gmail.com',
    username = 'hyangwoo',
    rmaid = '182'
) => {
    sgMail
        .send({
            from: 'shine.thw@gmail.com', // Change to your verified sender
            subject: 'RMA Approved',
            templateId: 'd-1c4b7d2230ea47f2997c87dbc696a875',
            personalizations: [
                {
                    to: email,
                    dynamicTemplateData: {
                        Username: username,
                        RmaID: rmaid,
                        URL: `http://localhost:3000/rmaDetails/${rmaid}`
                    }
                }
            ]
        })
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports.rmaRejectedMail = (
    email = 'shine.thw@gmail.com',
    username = 'hyangwoo',
    rmaid = '182'
) => {
    sgMail
        .send({
            from: 'shine.thw@gmail.com', // Change to your verified sender
            subject: 'RMA Rejected',
            templateId: 'd-03dd5c5e80c8479f96d2cffb4fd8232a',
            personalizations: [
                {
                    to: email,
                    dynamicTemplateData: {
                        Username: username,
                        RmaID: rmaid,
                        URL: `http://localhost:3000/rmaDetails/${rmaid}`
                    }
                }
            ]
        })
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports.rmaReceivedMail = (email, username, rmaid) => {
    sgMail
        .send({
            from: 'shine.thw@gmail.com', // Change to your verified sender
            subject: 'RMA Products Received',
            templateId: 'd-38569b642c5e4edcb0907b5117dcd170',
            personalizations: [
                {
                    to: email,
                    dynamicTemplateData: {
                        Username: username,
                        RmaID: rmaid
                    }
                }
            ]
        })
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports.rmaVerifiedMail = (email, username, rmaid) => {
    sgMail
        .send({
            from: 'shine.thw@gmail.com', // Change to your verified sender
            subject: 'RMA Products Verified',
            templateId: 'd-b9e24118425a40e484bc427898a03ab8',
            personalizations: [
                {
                    to: email,
                    dynamicTemplateData: {
                        Username: username,
                        RmaID: rmaid
                    }
                }
            ]
        })
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports.rmaInprogressMail = (email, username, rmaid) => {
    sgMail
        .send({
            from: 'shine.thw@gmail.com', // Change to your verified sender
            subject: 'RMA In Progress',
            templateId: 'd-7e69aac661674008825aa00f79505a32',
            personalizations: [
                {
                    to: email,
                    dynamicTemplateData: {
                        Username: username,
                        RmaID: rmaid,
                        URL: `http://localhost:3000/rmaDetails/${rmaid}`
                    }
                }
            ]
        })
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports.tloanAcceptedMail = (email, username, tloanid) => {
    sgMail
        .send({
            from: 'shine.thw@gmail.com', // Change to your verified sender
            subject: 'T-Loan Approved',
            templateId: 'd-bc60b4d141fd452f88714ed54a78fbe2',
            personalizations: [
                {
                    to: email,
                    dynamicTemplateData: {
                        Username: username,
                        TLoanID: tloanid,
                        URL: `http://localhost:3000/tloandetails/${tloanid}`
                    }
                }
            ]
        })
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports.tloanRejectedMail = (email, username, tloanid) => {
    sgMail
        .send({
            // to: 'shine.thw@gmail.com', // Change to your recipient
            from: 'shine.thw@gmail.com', // Change to your verified sender
            subject: 'T-Loan Approved',
            templateId: 'd-1fd651d001e744ed976bd3aa9f464c32 ',
            personalizations: [
                {
                    to: email,
                    dynamicTemplateData: {
                        Username: username,
                        TLoanID: tloanid
                    }
                }
            ]
        })
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports.tloanExtensionAcceptedMail = (email, username, tloanid) => {
    sgMail
        .send({
            // to: 'shine.thw@gmail.com', // Change to your recipient
            from: 'shine.thw@gmail.com', // Change to your verified sender
            subject: 'T-Loan Extension Approved',
            templateId: 'd-426c38a58f73486bbe2f53f378e31082',
            personalizations: [
                {
                    to: email,
                    dynamicTemplateData: {
                        Username: username,
                        TLoanID: tloanid,
                        URL: `http://localhost:3000/tloandetails/${tloanid}`
                    }
                }
            ]
        })
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports.tloanExtensionRejectedMail = (email, username, tloanid) => {
    sgMail
        .send({
            // to: 'shine.thw@gmail.com', // Change to your recipient
            from: 'shine.thw@gmail.com', // Change to your verified sender
            subject: 'T-Loan Extension Rejected',
            templateId: 'd-a0c83a5bca4941ed8f1baeb7c7aa3604',
            personalizations: [
                {
                    to: email,
                    dynamicTemplateData: {
                        Username: username,
                        TLoanID: tloanid
                    }
                }
            ]
        })
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};
