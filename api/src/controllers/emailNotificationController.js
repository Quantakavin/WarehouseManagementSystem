
require('dotenv').config()
const sgMail = require('@sendgrid/mail')
// const apiKey = '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'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


//  module.exports.emailNotification = async ( req, res ) =>{
    const msg ={
        to: 'bryanyang70@gmail.com', // Change to your recipient
        from: 'bryanyang80@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',

    }
    sgMail
    .send(msg)
    .then(()=>{
        console.log('Email sent')
    })
    .catch((error)=>{
        console.log(error)
    })
 
      
    
        
      

// }

