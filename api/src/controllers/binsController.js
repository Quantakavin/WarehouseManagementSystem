const dashboard = require('../services/binsService');
const redisClient = require('../config/caching');

// Get Bin Location By BinID

// Get Bin Infornation by BinID

// Get Bin Informmation Test
module.exports.binInfo = async (req, res) => {
    try {
        const BinInfo = await redisClient.get('BinInfo');
        if (BinInfo !== null) {
            const redisresults = JSON.parse(BinInfo);
            return res.status(200).json(redisresults);
        }
        const results = await dashboard.getBinInformmation();
        if (results.length > 0) {
            console.log('endpoint working');
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('There is no such BinInfo');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

// Get Products in Bin By BinID

// Get Empty Bin List
