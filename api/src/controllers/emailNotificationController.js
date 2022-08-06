const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path: path.resolve(__dirname, '../../.env')})
const sgMail = require('@sendgrid/mail')
// const apiKey = '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'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports.sendMail = ()=>{
    const msg = {
        to, // Change to your recipient
        from: 'bryanyang80@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'noobs',
        html: '<strong>fk</strong>',
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
}
