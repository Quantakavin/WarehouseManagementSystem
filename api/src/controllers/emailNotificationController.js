const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const sgMail = require('@sendgrid/mail');
// const apiKey = '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'
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.rmaAcceptedMail = () => {
    const msg = {
        to: 'shine.thw@gmail.com', // Change to your recipient
        from: 'shine.thw@gmail.com', // Change to your verified sender
        subject: 'RMA Approved',
        text: 'noobs',
        html: '<strong>RMA Approved</strong>'
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports.rmaRejectedMail = () => {
    const msg = {
        to: 'shine.thw@gmail.com', // Change to your recipient
        from: 'shine.thw@gmail.com', // Change to your verified sender
        subject: 'RMA Rejected',
        text: 'noobs',
        html: '<strong>RMA Rejected</strong>'
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports.rmaReceivedMail = () => {
    const msg = {
        to: 'shine.thw@gmail.com', // Change to your recipient
        from: 'shine.thw@gmail.com', // Change to your verified sender
        subject: 'RMA Received',
        text: 'noobs',
        html: '<strong>RMA Received</strong>'
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports.rmaVerifiedMail = () => {
    const msg = {
        to: 'shine.thw@gmail.com', // Change to your recipient
        from: 'shine.thw@gmail.com', // Change to your verified sender
        subject: 'RMA Verified',
        text: 'noobs',
        html: '<strong>RMA Verified</strong>'
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports.rmaInprogressMail = () => {
    const msg = {
        to: 'shine.thw@gmail.com', // Change to your recipient
        from: 'shine.thw@gmail.com', // Change to your verified sender
        subject: 'RMA In Progress',
        text: 'noobs',
        html: '<strong>RMA In Progress</strong>'
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports.tloanAcceptedMail = () => {
    const msg = {
        to: 'shine.thw@gmail.com', // Change to your recipient
        from: 'shine.thw@gmail.com', // Change to your verified sender
        subject: 'TLoan Approved',
        text: 'noobs',
        html: '<strong>TLoan Approved</strong>'
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports.tloanRejectedMail = () => {
    const msg = {
        to: 'shine.thw@gmail.com', // Change to your recipient
        from: 'shine.thw@gmail.com', // Change to your verified sender
        subject: 'TLoan Rejected',
        text: 'noobs',
        html: '<strong>TLoan Rejected</strong>'
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports.tloanExtensionAcceptedMail = () => {
    const msg = {
        to: 'shine.thw@gmail.com', // Change to your recipient
        from: 'shine.thw@gmail.com', // Change to your verified sender
        subject: 'TLoan Extension Approved',
        text: 'noobs',
        html: '<strong>TLoan Extension Approved</strong>'
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports.tloanExtensionRejectedMail = () => {
    const msg = {
        to: 'shine.thw@gmail.com', // Change to your recipient
        from: 'shine.thw@gmail.com', // Change to your verified sender
        subject: 'TLoan Extension Rejected',
        text: 'noobs',
        html: '<strong>TLoan Extension Rejected</strong>'
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
};
