const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')
const user = require('../services/userService')
const config = require('../config/config')
const e = require('express')

module.exports.loginUser = async (req, res) => {
    
    const { email, password } = req.body
    try {
        const results = await user.getByEmail(email)
        if (results[0].length > 0) {
            if (bcrypt.compareSync(password, results[0][0].Password) === true) {
                const data = {
                    id: results[0][0].UserID,
                    name: results[0][0].Username,
                    usergroup: results[0][0].UserGroupName,
                    token: jwt.sign({ id: results[0][0].UserID}, config.JWTKey, {
                        expiresIn: 86400
                    })
                }
                return res.status(200).json(data)
            } else {
                return res.status(401).json({ message: 'Invalid Email/Password Combination' })
            }
        } else {
            return res.status(401).json({ message: "User with email doesn't exist" })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports.getAllUsers = async (req, res) => { 
    try {
        const results = await user.getAll()
        return res.status(200).json(results[0])
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.getUserById = async (req, res) => {
    const userID = req.params.id
    try {
        const results = await user.getByID(userID)
        if (results.length > 0) {
            return res.status(200).send(results[0])
        } else {
            return res.status(404).send('Cannot find user with that id')
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.getUserByName = async (req, res) => {
    const { name } = req.query
    try {
        const results = await user.getByName(name)
        if (results.length > 0) {
            return res.status(200).send(results[0])
        } else {
            return res.status(404).send('No more results')
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}


module.exports.createUser = async (req, res) => {
    const { name, email, password, mobileno, company, usergroup } = req.body
    try {
        const hash = await bcrypt.hash(password, 10)
        try {
            const results = await user.insert(name, email, hash, mobileno, company, usergroup)
            return res.status(201).send({ message: 'User created successfully!' })
        } catch (issue) {
            if (issue.code === 'ER_DUP_ENTRY') {
                return res.status(422).json({ message: 'User with that email already exists' })
            }
            return res.status(500).json({ message: 'Internal Server Error!' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.updateUser = async (req, res) => {
    const userID = req.params.id
    const { name, email, password, mobileno, company, usergroup, active } = req.body
    try {
        const results = await user.getByID(userID)
        if (results.length > 0) {
            const hash = await bcrypt.hash(password, 10)
            try {
                await user.update(userID, name, email, hash, mobileno, company, usergroup, active)
                return res.status(204).json({ message: 'User updated successfully!' })
            } catch (issue) {
                if (issue.code === 'ER_DUP_ENTRY') {
                    return res.status(422).json({ message: 'User with that email already exists' })
                }
                return res.status(500).json({ message: 'Internal Server Error!' })
            }
        } else {
            return res.status(404).send('Cannot find user with that id')
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
    
}

/*

module.exports.deleteUser = async (req, res) => {
    
}

*/