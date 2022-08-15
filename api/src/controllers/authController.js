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
                            expiresIn: 900
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

exports.refresh_token = async (req, res) => {
    const { signedCookies = {} } = req //get the cookie from the request header
    const { refreshToken } = signedCookies //get the cookie by key
    if (refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, config.cookiesecret)
            const userId = payload.user_id
            let getUser = await auth.findUser(userId)
            if (getUser.length == 1) {
                const token = {
                    user_id: results[0].user_id,
                    displayName: results[0].username,
                    email: results[0].email,
                    token: jwt.sign({
                        userId: results[0].user_id,
                    },
                        config.JWTKey, {
                        expiresIn: 60 * 5
                        // 5 minutes expiry
                    })
                };
                //updates refresh token (remember me feature)
                const refresh_token = jwt.sign({
                    user_id:
                        results[0].user_id
                }, config.cookiesecret, {
                    expiresIn: 60 * 60 * 24 * 3 //3 days
                })
                res.cookie('refreshToken', refresh_token, {
                    httpOnly: true,
                    secured: true,
                    signed: true, maxAge: 60 * 60 * 24 * 3 * 1000, sameSite: "none",
                })
                return res.status(200).send(token);
            } else {
                return res.status(401).send()
            }
        } catch (error) {
            return res.status(401).send()
        }
    } else {
        return res.status(401).send()
    }
}

exports.logout = async (req, res) => {
    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies
    if (refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, config.cookiesecret)
            const userId = payload.user_id
            let getUser = await auth.findUser(userId)
            if (getUser.length == 1) {
                res.clearCookie("refreshToken")
                return res.status(200).send()
            }
        } catch (error) {
            return res.status(401).send('error')
        }
    }
}


exports.isLoggedIn = async (req, res, next) => {
    let auth = req.headers.authorization
    if (!auth) return res.status(400).send(codes(400, 'Invalid Request'))
    try {
        let token = auth.split(' ')[1]
        let { userId, email } = jwt.verify(token, config.JWTKey)
        let getLoggedInData = await user.isLoggedInService(userId, email)
        if (getLoggedInData.length == 1) {
            let getSuspendedAccount = await
                user.isSuspendedService(userId)
            if (getSuspendedAccount[0].status == 2) {
                req.userId = userId
                req.email = email
                next()
            } else {
                return res.status(403).send(codes(403))
            }
        } else {
            return res.status(401).send(codes(401))
        }
    } catch (error) {
        console.log(error)
        if (error.expiredAt) {
            return res.status(401).send(codes(401))
        }
        return res.status(400).send(codes(400))
    }
}