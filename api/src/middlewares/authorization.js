const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authorization = {
    verifyUser: (req, res, next) => {
        if (typeof req.headers.authorization !== 'undefined') {
            const token = req.headers.authorization.split(' ')[1];

            jwt.verify(token, config.JWTKey, (err, data) => {
                if (err) {
                    res.status(401).json({ message: 'You do not have access' });
                } else {
                    next();
                }
            });
        } else {
            res.status(401).send({ message: 'Please login first' });
        }
    },

    verifyCorrectUser: (req, res, next) => {
        if (typeof req.headers.authorization !== 'undefined') {
            const token = req.headers.authorization.split(' ')[1];

            jwt.verify(token, config.JWTKey, (err, data) => {
                if (err) {
                    res.status(401).json({ message: 'You do not have access' });
                } else if (data.id.toString() !== req.params.id) {
                    res.status(401).json({ message: 'You do not have access' });
                } else {
                    next();
                }
            });
        } else {
            res.status(401).send({ message: 'Please login first' });
        }
    },

    verifyAdmin: (req, res, next) => {
        if (typeof req.headers.authorization !== 'undefined') {
            const token = req.headers.authorization.split(' ')[1];

            jwt.verify(token, config.JWTKey, (err, data) => {
                if (err) {
                    res.status(401).json({ message: 'You do not have access' });
                } else if (data.role === 'Admin') {
                    next();
                } else {
                    res.status(403).json({ message: 'Only Admins can access this function' });
                }
            });
        } else {
            res.status(401).send({ message: 'Please login first' });
        }
    }
};

// const authorization = {
//     verifyUser: (req, res, next) => {
//         if (typeof req.cookies.access_token !== 'undefined') {
//             const token = req.cookies.access_token;

//             jwt.verify(token, config.JWTKey, (err, data) => {
//                 if (err) {
//                     res.status(401).json({ message: 'You do not have access' });
//                 } else {
//                     next();
//                 }
//             });
//         } else {
//             res.status(401).send({ message: 'Please login first' });
//         }
//     },

//     verifyAdmin: (req, res, next) => {
//         if (typeof req.cookies.access_token !== 'undefined') {
//             const token = req.cookies.access_token;

//             jwt.verify(token, config.JWTKey, (err, data) => {
//                 if (err) {
//                     res.status(401).json({ message: 'You do not have access' });
//                 } else if (data.role === 'Admin') {
//                     next();
//                 } else {
//                     res.status(403).json({ message: 'Only Admins can access this function' });
//                 }
//             });
//         } else {
//             res.status(401).send({ message: 'Please login first' });
//         }
//     }
// };

module.exports = authorization;
