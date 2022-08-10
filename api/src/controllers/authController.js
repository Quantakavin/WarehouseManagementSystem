const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const user = require('../services/userService');

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const results = await user.getByEmail(email);
        if (results[0].length > 0) {
            if (bcrypt.compareSync(password, results[0][0].Password) === true) {
                const data = {
                    id: results[0][0].UserID,
                    name: results[0][0].Username,
                    usergroup: results[0][0].UserGroupName,
                    token: jwt.sign(
                        { id: results[0][0].UserID, role: results[0][0].UserGroupName },
                        config.JWTKey,
                        {
                            expiresIn: 300
                        }
                    )
                };
                const refreshToken = jwt.sign(
                    { id: results[0][0].UserID },
                    config.refreshtokensecret,
                    {
                        expiresIn: 259200
                    }
                );
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secured: true,
                    signed: true,
                    maxAge: 259200000,
                    sameSite: 'none'
                });
                return res.status(200).json(data);
            }
            return res.status(401).json({ message: 'Invalid Email/Password Combination' });
        }
        return res.status(401).json({ message: "User with email doesn't exist" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// module.exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const results = await user.getByEmail(email);
//         if (results[0].length > 0) {
//             if (bcrypt.compareSync(password, results[0][0].Password) === true) {
//                 const token = jwt.sign(
//                         { id: results[0][0].UserID, name: results[0][0].Username, role: results[0][0].UserGroupName },
//                         config.JWTKey,
//                         {
//                             expiresIn: 86400
//                         }
//                     )
//                 return res.cookie('access_token', token, {
//                     httpOnly: true,
//                     secure: process.env.NODE_ENV === 'production'
//                 }).status(200).json({ message: 'Login successful' })
//             }
//             return res.status(401).json({ message: 'Invalid Email/Password Combination' });
//         }
//         return res.status(401).json({ message: "User with email doesn't exist" });
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// };
