const validator = require('validator');

const validation = {
    validateLogin(req, res, next) {
        const { email, password } = req.body;

        const passswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/;
        if (password === '' || email === '') {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        } else if (passswordRegex.test(password) && validator.isEmail(email)) {
            next();
        } else if (!validator.isEmail(email)) {
            res.status(400).json({
                message: 'Please enter a valid email'
            });
        } else if (!passswordRegex.test(password)) {
            res.status(400).json({
                message: 'Please enter a valid password'
            });
        } else {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        }
    },

    validateUser: (req, res, next) => {
        const { name, email, password, mobileno, company, usergroup } = req.body;

        const passswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/;
        const phoneRegex = /^[6|8|9]\d{7}|\+65\s?[6|8|9]\d{7}|\(\+?65\)\s?[6|8|9]\d{7}$/;
        if (name === '' || email === '' || password === '' || mobileno === '') {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        } else if (company === null) {
            res.status(400).json({
                message: 'Please select the company the user belongs to'
            });
        } else if (usergroup === null) {
            res.status(400).json({
                message: 'Please select a user group to assign the user to'
            });
        } else if (
            passswordRegex.test(password) &&
            validator.isEmail(email) &&
            phoneRegex.test(mobileno)
        ) {
            next();
        } else if (!validator.isEmail(email)) {
            res.status(400).json({
                message: 'Please enter a valid email'
            });
        } else if (!passswordRegex.test(password)) {
            res.status(400).json({
                message: 'Please choose a stronger password'
            });
        } else if (!phoneRegex.test(mobileno)) {
            res.status(400).json({
                message: 'Please enter a valid phone number'
            });
        } else {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        }
    },

    validateUserGroup: (req, res, next) => {
        const { name, description } = req.body;

        if (name === '' || description === '') {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        } else {
            next();
        }
    },

    validateNotificationGroup: (req, res, next) => {
        const { name, description, company } = req.body;

        if (name === '' || description === '') {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        } else if (company === null) {
            res.status(400).json({
                message: 'Please select a company to assign the notification group to'
            });
        } else {
            next();
        }
    },

    validateLoan: (req, res, next) => {
        const {  type, company, name, purpose, applicationdate, duration, requireddate, user, email, collection, items } = req.body;

        if (type === '' || email === '' || name === '' ||purpose === '' || company === '' || applicationdate === '' || duration === '' || requireddate === '' ||user === '' || collection === '' || items === []) {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        } else if (
            validator.isEmail(email)     
        ) {
            next();
        } else if (!validator.isEmail(email)) {
            res.status(400).json({
                message: 'Please enter a valid email'
            });
        
        } else {
            res.status(400).json({
                message: 'Please fill up all fields correctly'
            });
        }
    },

    
    validateRmaSubmission: (req, res, next) => {
        const { contactperson, contactno, salesmanid, contactemail, company, products } = req.body;

        if (products === null) {
            res.status(400).json({
                message: 'Please add at least 1 product to the table'
            });
        } else if (contactperson && contactno & salesmanid && contactemail && company === null) {
            res.status(400).json({
                message: 'Please fill in the form fields'
            });
        } else if (contactperson === null) {
            res.status(400).json({
                message: 'Please enter the customer name'
            });
        } else if (contactno === null) {
            res.status(400).json({
                message: 'Please enter the customer contact number'
            });
        } else if (contactemail === null) {
            res.status(400).json({
                message: 'Please enter the customer email'
            });
        } else if (company === null) {
            res.status(400).json({
                message: 'Please enter the customer company'
            });
        } else {
            next();
        }
    },

    validateRmaInstruction: (req, res, next) => {
        const {products} = req.body;
        products.map((product) => {
            if (product.Instructions === null) {
                res.status(400).json({
                    message: 'Please provide instructions for each product'
                });
            } else {
                next();
            }
        })
    }
};

module.exports = validation;
