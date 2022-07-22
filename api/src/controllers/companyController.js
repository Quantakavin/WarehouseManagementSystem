const company = require('../services/companyService');
const redisClient = require('../config/caching');

module.exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await redisClient.get('companies');
        if (companies !== null) {
            const redisresults = JSON.parse(companies);
            return res.status(200).json(redisresults);
        }
        const results = await company.getAll();
        redisClient.set('companies', JSON.stringify(results[0]));
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getAllCompanies2 = async (req, res) => {
    try {
        const companies = await redisClient.get('companies2');
        if (companies !== null) {
            const redisresults = JSON.parse(companies);
            return res.status(200).json(redisresults);
        }
        const results = await company.getAll2();
        redisClient.set('companies', JSON.stringify(results[0]));
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
