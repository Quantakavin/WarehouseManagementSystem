const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')
const user = require('../services/userService')
const config = require('../config/config')

module.exports.loginUser = async (req, res) => {
    
    const { email, password } = req.body
    try {
        const results = await user.findByEmail(email)
        console.log(results)
        if (results.rows[0] === null) {
            return res.status(500).json({ message: "User with email doesn't exist" })
        }
        if (bcrypt.compareSync(password, results.rows[0].password) === true) {
            const data = {
                id: results.rows[0].id,
                name: results.rows[0].name,
                token: jwt.sign({ id: results.rows[0].id }, config.JWTKey, {
                    expiresIn: 86400
                })
            }
            return res.status(200).json(data)
        }
        return res.status(401).json({ message: 'Invalid Email/Password Combination' })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

/*

module.exports.getAllUsers = async (req, res) => {
    try {
        const results = await user.getAll()
        return res.status(200).json(results)
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.getUserById = async (req, res) => {
    const { userID } = req.params
    try {
        const results = await user.getByID(userID)
        return res.status(200).send(results.rows[0])
    } catch (error) {
        return res.status(404).send('Cannot find user with that id')
    }
}

module.exports.getUserByName = async (req, res) => {
    const { name } = req.params
    try {
        const results = await user.getByName(name)
        return res.status(200).send(results.rows[0])
    } catch (error) {
        return res.status(404).send('Cannot find user with that id')
    }
}

module.exports.createUser = async (req, res) => {
    
}

module.exports.updateUser = async (req, res) => {
    
}


module.exports.deleteUser = async (req, res) => {
    
}

module.exports.viewProfile = async (req, res) => {
    
}


module.exports.updateProfile = async (req, res) => {
    
}

*/