const express = require('express');
const resetPassword = express.Router();
const userService = require('../services/userService');
const {
    hashSync,
    genSaltSync
} = require("bcrypt");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

resetPassword.post('/forgotPassword', async (req, res, next) => {
    try {
        const email = req.body.email;
        console.log(email);

        // Get request origin from  the HOST header.
        const origin = req.header('Origin');

        const user = await userService.getByEmail(email);

        if (!user) {
            return res.json({
                status: 'ok'
            });
        }

        // Get all tokens that were previously set for this user and set used to 1. Prevents old and expired tokens from being used. 
        await userService.expireOldTokens(email, 1);

        // Create reset token that expires after 1 hours.
        const resetToken = crypto.randomBytes(40).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
        const createdAt = new Date(Date.now());

        const expiredAt = resetTokenExpires;

        // Insert new token into resetPasswordToken table.
        await userService.insertResetToken(email, resetToken, createdAt, expiredAt, 0);

        // Send email
        await sendPasswordResetEmail(email, resetToken, origin);
        res.json({
            message: 'Please check your email for a new password'
        });

    } catch (e) {
        console.log(e);
    }
});

async function sendEmail({
    to,
    subject,
    html,
    from = process.env.EMAIL_FROM
}) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.USER, // ethereal-generated email address
            pass: process.env.PASS // ethereal-generated emailpassword
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    await transporter.sendMail({
        from,
        to,
        subject,
        html
    });

    console.log("Email sent sucessfully");

};

async function sendPasswordResetEmail(email, resetToken, origin) {
    let message;

    if (origin) {
        const resetUrl = `${origin}/api/resetPassword?token=${resetToken} email=${email}`;
        message = `<p>Please click the below link to reset your password, the link will be valid for 1 hour:</p>
                       <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to reset your password with the <code>/api/reset-password</code> api route:</p>
                       <p><code>${resetToken}</code></p>`;
    }

    await sendEmail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: ' Reset your Password',
        html: `<h4>Reset Password </h4>
                   ${message}`
    });
}

// Reset token validation
async function validateResetToken(req, res, next) {

    const email = req.body.email;
    const resetToken = req.body.token;

    if (!resetToken || !email) {
        return res.sendStatus(400);
    }

    // Verify if token exists in the resetPasswordToken and not expired.
    const currentTime = new Date(Date.now());

    const token = await userService.findValidToken(resetToken, email, currentTime);

    if (!token) {
        res.json('Invalid token, please try again.');
    }

    next();
};

resetPassword.post('/resetPassword', validateResetToken, async (req, res, next) => {
    try {

        const newPassword = req.body.password;
        const email = req.body.email;

        if (!newPassword) {
            return res.sendStatus(400);
        }

        const user = await userService.getByEmail(email);

        const salt = genSaltSync(10);
        const password = hashSync(newPassword, salt);

        await userService.updateUserPassword(password, user[0][0].UserID);

        res.json({
            message: 'Password reset successful, you can now login with the new password'
        });

    } catch (e) {
        console.log(e);
    }
})

module.exports = resetPassword;