const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const sgMail = require('@sendgrid/mail');
const user = require('../services/userService');
const notificationGroup = require('../services/notificationGroupService');
const userGroup = require('../services/userGroupService');
const config = require('../config/config');
const redisClient = require('../config/caching');
const twilioClient = require('../config/twilio');
const ConvertMobileNo = require('../utils/ConvertPhoneNoToE164Format');

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const results = await user.getByEmail(email);
        if (results[0].length > 0) {
            if (results[0][0].Active !== 'Y') {
                return res.status(401).json({ message: 'Your account has been deactivated' });
            }
            if (bcrypt.compareSync(password, results[0][0].Password) === true) {
                const results2 = await userGroup.getFeatures(results[0][0].UserGroupID);
                const data = {
                    id: results[0][0].UserID,
                    name: results[0][0].Username,
                    usergroup: results[0][0].UserGroupName,
                    permissions: results2[0],
                    enabled2FA: results[0][0].Enabled2FA,
                    mobileNo: results[0][0].MobileNo,
                    telegramid: results[0][0].TelegramID,
                    unreadnotifications: results[0][0].Unreadnotifications,
                    token: jwt.sign(
                        { id: results[0][0].UserID, role: results[0][0].UserGroupName },
                        config.JWTKey,
                        {
                            expiresIn: 86400
                        }
                    )
                };
                if (results[0][0].Enabled2FA === 1) {
                    await twilioClient.verify.v2
                        .services(config.TwilioService)
                        .verifications.create({
                            to: ConvertMobileNo(results[0][0].MobileNo),
                            channel: 'sms'
                        })
                        .then((verification) =>
                            console.log('twilio status is ', verification.status)
                        );
                }

                return res.status(200).json(data);
            }
            return res.status(401).json({ message: 'Invalid Email/Password Combination' });
        }
        return res.status(401).json({ message: "User with email doesn't exist" });
    } catch (error) {
        console.log(error);
        if (error.status === 429) {
            return res.status(500).json({ message: 'Too many requests. Please try again later' });
        }
        console.log(error.status);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.resend2FAToken = async (req, res) => {
    const { mobileno } = req.body;
    try {
        await twilioClient.verify.v2
            .services(config.TwilioService)
            .verifications.create({ to: ConvertMobileNo(mobileno), channel: 'sms' })
            .then((verification) => console.log('twilio status is ', verification.status));
        return res.status(204).send();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.verify2FAToken = async (req, res) => {
    const { mobileno = null } = req.query;
    const { code } = req.body;
    let verificationstatus = '';
    console.log('the no is ', code);
    try {
        await twilioClient.verify.v2
            .services(config.TwilioService)
            .verificationChecks.create({ to: ConvertMobileNo(mobileno), code })
            .then((verificationCheck) => (verificationstatus = verificationCheck));
        if (verificationstatus.status !== 'approved') {
            console.log(verificationstatus);
            return res.status(400).json({ message: 'Incorrect code entered! Please try again.' });
        }
        return res.status(204).send();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getAllNames = async (req, res) => {
    const { name = null } = req.query;
    try {
        const results = await user.getNames(name);
        return res.status(200).json(results[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await redisClient.get('users');
        if (users !== null) {
            const redisresults = JSON.parse(users);
            return res.status(200).json(redisresults);
        }
        const results = await user.getAll();
        redisClient.set('users', JSON.stringify(results[0]), 'EX', 60 * 60 * 24);
        return res.status(200).json(results[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.filterUsers = async (req, res) => {
    const {
        pageSize = 5,
        pageNo = 0,
        sortColumn = null,
        sortOrder = null,
        name = null
    } = req.query;
    try {
        const results = await user.filter(pageSize, pageNo, sortColumn, sortOrder, name);
        return res.status(200).json(results[0][0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

// module.exports.getAllUsers = async (req, res) => {
//     const { limit, page } = req.query;
//     try {
//         const users = await redisClient.get(`users?limit=${limit}&page=${page}`);
//         if (users !== null) {
//             const redisresults = JSON.parse(users);
//             return res.status(200).json(redisresults);
//         }
//         const results = await user.getAll(limit, page);
//         redisClient.set(`users?limit=${limit}&page=${page}`, JSON.stringify(results[0]));
//         return res.status(200).json(results[0]);
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: 'Internal Server Error!' });
//     }
// };

module.exports.getUserById = async (req, res) => {
    const userID = req.params.id;
    try {
        const reqUser = await redisClient.get(`user#${userID}`);
        if (reqUser !== null) {
            const redisresults = JSON.parse(reqUser);
            return res.status(200).json(redisresults);
        }
        let output = [];
        const results = await user.getByID(userID);
        if (results[0].length > 0) {
            [output] = results;
            const results2 = await notificationGroup.getByUser(userID);
            const results3 = await userGroup.getFeatures(results[0][0].UserGroupID);
            if (results2.length > 0) {
                [output[0].NotificationGroups] = results2;
            }
            if (results3.length > 0) {
                [output[0].Permissions] = results3;
            }
            redisClient.set(`user#${userID}`, JSON.stringify(output), { EX: 60 * 60 * 24 });
            return res.status(200).send(output);
        }
        return res.status(404).json({ message: 'Cannot find user with that id' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getUserByName = async (req, res) => {
    const { name } = req.query;
    try {
        const results = await user.getByName(name);
        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        }
        return res.status(404).json({ message: 'No more results' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.createUser = async (req, res) => {
    const { name, email, password, mobileno, company, usergroup, notificationgroups } = req.body;
    console.log('noti groups are ', notificationgroups);
    try {
        const hash = await bcrypt.hash(password, 10);
        await user.insert(name, email, hash, mobileno, company, usergroup, notificationgroups);
        redisClient.del('users');
        return res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        console.log('the error object is ', error);
        if (error.code === 'ER_DUP_ENTRY') {
            if (error.sqlMessage.endsWith(`key 'user_username_unique'`)) {
                return res.status(422).json({ message: 'User with that username already exists' });
            }
            return res.status(422).json({ message: 'User with that email already exists' });
        }
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.update2FA = async (req, res) => {
    const userID = req.params.id;
    const { enabled2FA } = req.body;
    console.log('the boolean is ', req.body);
    console.log('the boolean is ', enabled2FA);
    let return2FA;
    let successmsg = '';
    if (enabled2FA) {
        return2FA = 1;
        successmsg = '2FA enabled successfully';
    } else {
        return2FA = 0;
        successmsg = '2FA disabled successfully';
    }
    try {
        const results = await user.getByID(userID);
        if (results.length > 0) {
            await user.update2FA(userID, return2FA);
            redisClient.del(`user#${userID}`);
            return res.status(204).json({ message: successmsg });
        }
        return res.status(404).json({ message: 'Cannot find user with that id' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.updateUser = async (req, res) => {
    const userID = req.params.id;
    const {
        name,
        email,
        password = null,
        mobileno,
        company,
        usergroup,
        active,
        notificationgroups
    } = req.body;
    try {
        // const notigroups = notificationgroups.map((group) => {
        //     return JSON.parse(group)
        // })
        const results = await user.getByID(userID);
        let finalactive = '';
        if (active) {
            finalactive = 'Y';
        } else {
            finalactive = 'N';
        }
        if (results.length > 0) {
            if (password !== null) {
                const hash = await bcrypt.hash(password, 10);
                await user.update(
                    userID,
                    name,
                    email,
                    hash,
                    mobileno,
                    company,
                    usergroup,
                    finalactive,
                    notificationgroups
                );
            } else {
                await user.updateWithoutPassword(
                    userID,
                    name,
                    email,
                    mobileno,
                    company,
                    usergroup,
                    finalactive,
                    notificationgroups
                );
            }
            redisClient.del(`user#${userID}`);
            return res.status(204).json({ message: 'User updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find user with that id' });
    } catch (error) {
        console.log(error);
        if (error.code === 'ER_DUP_ENTRY') {
            if (error.sqlMessage.endsWith(`key 'user_username_unique'`)) {
                return res.status(422).json({ message: 'User with that username already exists' });
            }
            return res.status(422).json({ message: 'User with that email already exists' });
        }
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.deleteUser = async (req, res) => {
    const userID = req.params.id;
    try {
        const results = await user.getByID(userID);
        if (results[0].length > 0) {
            const results2 = await user.checkTLoansAndRMA(userID);
            console.log(results2);
            if (results2[0][0].Count === 0) {
                await user.delete(userID);
                redisClient.del('users');
                return res.status(200).json({ message: 'User deleted successfully!' });
            }
            return res.status(405).json({
                message: 'This user cannot be deleted as they have outstanding TLoans or RMAs'
            });
        }
        return res.status(404).json({ message: 'Cannot find User with that id' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.updateUserTeleID = async (req, res) => {
    const userID = req.params.id;
    const { telegramid = null } = req.body;
    try {
        // const notigroups = notificationgroups.map((group) => {
        //     return JSON.parse(group)
        // })
        const results = await user.getByID(userID);
        if (results.length > 0) {
            await user.updateTeleID(userID, telegramid);
            redisClient.del(`user#${userID}`);
            return res.status(204).json({ message: 'User telegram id updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find user with that id' });
    } catch (error) {
        console.log(error);
        if (error.code === 'ER_DUP_ENTRY') {
            if (error.sqlMessage.endsWith(`key 'user_telegramid_unique'`)) {
                return res
                    .status(422)
                    .json({ message: 'User with that Telegram ID already exists' });
            }
            return res.status(422).json({ message: 'User with that email already exists' });
        }
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.updateUserPassword = async (req, res, next) => {
    const userID = req.params.id;
    const { password } = req.body;

    try {
        if (!password) {
            return res.status(400).json({
                message: 'Please enter password.'
            });
        }

        const results = await user.getByID(userID);

        if (results.length > 0) {
            const hash = await bcrypt.hash(password, 10);
            await user.updatePassword(hash, userID);

            return res.status(200).json({
                message: 'Password changed successfully.'
            });
        }

        return res.status(404).json({
            message: 'Cannot find user with that id'
        });
    } catch (e) {
        console.log(e);
    }
};
