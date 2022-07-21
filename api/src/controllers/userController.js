const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const sgMail = require('@sendgrid/mail');
const user = require('../services/userService');
const notificationGroup = require('../services/notificationGroupService');
const config = require('../config/config');
const redisClient = require('../config/caching');

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const results = await user.getByEmail(email);
        if (results[0].length > 0) {
            if (results[0][0].Active !== 'Y') {
                return res.status(401).json({ message: 'Your account has been inactivated' });
            } else if (bcrypt.compareSync(password, results[0][0].Password) === true) {
                const data = {
                    id: results[0][0].UserID,
                    name: results[0][0].Username,
                    usergroup: results[0][0].UserGroupName,
                    token: jwt.sign(
                        { id: results[0][0].UserID, role: results[0][0].UserGroupName },
                        config.JWTKey,
                        {
                            expiresIn: 86400
                        }
                    )
                };
                return res.status(200).json(data);
            }
            return res.status(401).json({ message: 'Invalid Email/Password Combination' });
        }
        return res.status(401).json({ message: "User with email doesn't exist" });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.getAllNames = async (req, res) => {
    const { name=null } = req.query;
    try {
        const results = await user.getNames(name);
        return res.status(200).json(results[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}; 

module.exports.getAllUsers = async (req, res) => {
    const { pageSize=5, pageNo=0, sortColumn=null, sortOrder=null, name=null } = req.query;
    try {
        const results = await user.getAll(pageSize, pageNo, sortColumn, sortOrder, name);
        return res.status(200).json(results[0][0]);
    } catch (error) {
        console.log(error)
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
            if (results2.length > 0) {
                [output[0].NotificationGroups] = results2;
            }
            redisClient.set(`user#${userID}`, JSON.stringify(output));
            return res.status(200).send(output);
        }
        return res.status(404).json({ message: 'Cannot find user with that id' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getUserById2 = async (req, res) => {
    const userID = req.params.id;
    try {
        const reqUser = await redisClient.get(`user2#${userID}`);
        if (reqUser !== null) {
            const redisresults = JSON.parse(reqUser);
            return res.status(200).json(redisresults);
        }
        let output = [];
        const results = await user.getByID(userID);
        if (results[0].length > 0) {
            [output] = results;
            const results2 = await notificationGroup.getByUser(userID);
            if (results2.length > 0) {
                [output[0].NotificationGroups] = results2;
            }
            redisClient.set(`user#${userID}`, JSON.stringify(output[0]));
            return res.status(200).send(output[0]);
        }
        return res.status(404).json({ message: 'Cannot find user with that id' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};


module.exports.getUsersGroupsByID = async (req, res) => {
    const userID = req.params.id;
    try {
        const results = await notificationGroup.getByUser(userID);
        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        }
        return res.status(404).json({ message: 'No more results' });
    } catch (error) {
        console.log(error)
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
    console.log("noti groups are ", notificationgroups)
    try {
        const hash = await bcrypt.hash(password, 10);
        await user.insert(name, email, hash, mobileno, company, usergroup, notificationgroups);
        redisClient.del('users');
        return res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        console.log(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(422).json({ message: 'User with that email already exists' });
        }
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
 
module.exports.updateUser = async (req, res) => {
    const userID = req.params.id;
    const { name, email, password, mobileno, company, usergroup, active, notificationgroups } = req.body;
    try {
        // const notigroups = notificationgroups.map((group) => {
        //     return JSON.parse(group)
        // })
        const results = await user.getByID(userID);
        if (results.length > 0) {
            const hash = await bcrypt.hash(password, 10);
            await user.update(
                userID,
                name,
                email,
                hash,
                mobileno,
                company,
                usergroup,
                active,
                notificationgroups
            );
            redisClient.del(`user#${userID}`);
            return res.status(204).json({ message: 'User updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find user with that id' });
    } catch (error) {
        console.log(error);
        if (error.code === 'ER_DUP_ENTRY') {
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
            console.log(results2)
            if (results2[0][0].Count === 0) {
                await user.delete(userID);
                redisClient.del('users');
                return res.status(200).json({ message: 'User deleted successfully!' });
            }
            return res
                .status(405)
                .json({ message: 'This user cannot be deleted as they have outstanding TLoans or RMAs' });
        }
        return res.status(404).json({ message: 'Cannot find User with that id' });2
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};