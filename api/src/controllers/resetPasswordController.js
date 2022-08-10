const { hashSync, genSaltSync } = require('bcrypt');
const nodemailer = require('nodemailer');
// const smime = require('nodemailer-smime');
const crypto = require('crypto');
const resetPasswordService = require('../services/resetPasswordService');
const userService = require('../services/userService');

async function sendEmail({ from, to, subject, html }) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // change when not using ethereal host email
        port: 587,
        auth: {
            user: process.env.USER, // use host email address (in .env file) OR ethereal email address (when testing)
            pass: process.env.PASS // use host email password (in .env file) OR ethereal email password (when testing)
        },
        from: process.env.USER,
        tls: {
            rejectUnauthorized: false
        }
    });

    // const options = {
    //     cert: '<PEM formatted cert>',
    //     chain: [
    //         '<PEM formatted cert>'
    //     ],
    //     key: '<PEM formatted key>'
    // }

    // await transporter.use('stream', smime(options));

    await transporter.sendMail({
        from,
        to,
        subject,
        html
    });

    console.log('Email sent sucessfully');
}

async function sendPasswordResetEmail(email, resetToken, origin) {
    let message;

    if (origin) {
        const resetUrl = `${origin}/resetpassword?token=${resetToken}&email=${email}`;
        message = ` <html lang="en-US">
                    <head>
                        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                        <title>Reset Password Email</title>
                        <meta name="description" content="Reset Password Email">
                        <style type="text/css">
                            a:hover {text-decoration: underline !important;}
                        </style>
                    </head>
                    
                    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                            <tr>
                                <td>
                                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                                        align="center" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="height:100px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                                    <tr>
                                                        <td style="height:40px;">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="text-align:center;">
                                                            <img width="40%" src="https://static.wixstatic.com/media/9240f9_6ca7497359ea4593baa65d30704d0e8c~mv2.jpg/v1/crop/x_0,y_137,w_400,h_109/fill/w_329,h_94,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/ISDN_logo.jpg" title="logo" alt="logo">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="height:20px;">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding:0 35px;">
                                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have requested to reset your password</h1>
                                                            <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                                You have submitted a password change request. Click on the following link to redirect you back to the website and reset your password.
                                                            </p>
                                                            <a href="${resetUrl}" style="background:#0a2540;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset Password</a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="height:40px;">&nbsp;</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        <tr>
                                            <td style="height:20px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="text-align:center;">
                                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>https://www.isdnholdings.com/</strong></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:80px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>`;
    }

    await sendEmail({
        from: process.env.USER,
        to: email,
        subject: 'Reset your Password',
        html: `<h4>Reset Password</h4>
                   ${message}`
    });
}

module.exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);

        // Get request origin from  the HOST header.
        const origin = req.header('Origin');

        const user = await userService.getByEmail(email);

        if (user[0].length > 0) {
            if (user[0][0].Active !== 'Y') {
                res.status(401).json({
                    message: 'User account has been deactivated.'
                });
            } else if (user[0][0].Active === 'Y') {
                // Get all tokens that were previously set for this user and set used to 1. Prevents old and expired tokens from being used.
                await resetPasswordService.expireOldTokens(email, 1);

                // Create reset token that expires after 1 hours.
                const resetToken = crypto.randomBytes(40).toString('hex');
                const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
                const createdAt = new Date(Date.now());

                const expiredAt = resetTokenExpires;

                // Insert new token into resetPasswordToken table.
                await resetPasswordService.insertResetToken(
                    email,
                    resetToken,
                    createdAt,
                    expiredAt,
                    0
                );

                // Send email
                await sendPasswordResetEmail(email, resetToken, origin);
                res.status(200).json({
                    message: 'Please check your email for the reset password link.'
                });
            }
        } else {
            res.status(404).json({
                message: 'User email address not found in database.'
            });
        }
    } catch (e) {
        console.log(e);
    }
};

module.exports.resetPassword = async (req, res) => {
    try {
        const newPassword = req.body.password;
        const { email } = req.body;

        if (!newPassword) {
            return res.status(400).json({
                message: 'Please enter a new password.'
            });
        }

        const user = await userService.getByEmail(email);

        const salt = genSaltSync(10);
        const password = hashSync(newPassword, salt);

        await userService.updatePassword(password, user[0][0].UserID);
        await resetPasswordService.expireOldTokens(email, 1);

        return res.status(200).json({
            message: 'Password reset successful, you can now login with the new password.'
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
