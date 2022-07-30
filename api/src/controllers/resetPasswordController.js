const express = require('express');
const resetPassword = express.Router();
const userService = require('../services/userService');
const resetPasswordService = require('../services/resetPasswordService');
const { hashSync, genSaltSync } = require("bcrypt");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

module.exports.forgotPassword = async (req, res, next) => {
    try {
        const email = req.body.email;
        console.log(email);

        // Get request origin from  the HOST header.
        const origin = req.header('Origin');

        const user = await userService.getByEmail(email);

        if (user[0].length > 0) {
            if (user[0][0].Active !== 'Y') {
                res.status(401).json({
                    message: 'User account has been deactivated.'
                });
            } else if (user[0][0].Active == 'Y') {
                // Get all tokens that were previously set for this user and set used to 1. Prevents old and expired tokens from being used. 
                await resetPasswordService.expireOldTokens(email, 1);

                // Create reset token that expires after 1 hours.
                const resetToken = crypto.randomBytes(40).toString('hex');
                const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
                const createdAt = new Date(Date.now());

                const expiredAt = resetTokenExpires;

                // Insert new token into resetPasswordToken table.
                await resetPasswordService.insertResetToken(email, resetToken, createdAt, expiredAt, 0);

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

async function sendEmail({
    from,
    to,
    subject,
    html
}) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // change when not using ethereal host email (e.g. to gmail)
        port: 587,
        auth: {
            user: process.env.USER, // use user email address OR ethereal email address (when testing)
            pass: process.env.PASS // use user email password OR ethereal email password (when testing)
        },
        tls: {
            rejectUnauthorized: false
        }
    });

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
        message = `<p>Please click the below link to reset your password, the link will be valid for 1 hour:</p>
                       <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to reset your password with the <code>/resetpassword</code> api route:</p>
                       <p><code>${resetToken}</code></p>`;
    }

    await sendEmail({
        from: process.env.USER,
        to: email,
        subject: 'Reset your Password',
        html: `<h4>Reset Password</h4>
                   ${message}`
    });
};

module.exports.resetPassword = async (req, res, next) => {
    try {
        const newPassword = req.body.password;
        const email = req.body.email;

        if (!newPassword) {
            return res.status(400).json({
                message: 'Please enter a new password.'
            });
        }

        const user = await userService.getByEmail(email);

        const salt = genSaltSync(10);
        const password = hashSync(newPassword, salt);

        await userService.updateUserPassword(password, user[0][0].UserID);
        await resetPasswordService.expireOldTokens(email, 1);

        res.status(200).json({
            message: 'Password reset successful, you can now login with the new password.'
        });
    } catch (e) {
        console.log(e);
    }
};
