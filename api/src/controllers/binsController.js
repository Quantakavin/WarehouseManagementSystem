const dashboard = require('../services/binsService');
const redisClient = require('../config/caching');
const bin = require('../services/binsService');


// Get Bin By Bin Tag
// module.exports. = async (req, res) => {
//     try {
//         const  = await redisClient.get('');
//         if ( !== null) {
//             const redisresults = JSON.parse();
//             return res.status(200).json(redisresults);
//         }
//         const results = await bin.getBinByBinTag();
//         if (results.length > 0) {
//             console.log('endpoint working');
//             return res.status(200).json(results[0]);
//         } else {
//             return res.status(404).send('There is no such BinInfo');
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send('Internal Server Error');
//     }
// };


// Get Bin Informmation Test
module.exports.binInfo = async (req, res) => {
    try {
        const BinInfo = await redisClient.get('BinInfo');
        if (BinInfo !== null) {
            const redisresults = JSON.parse(BinInfo);
            return res.status(200).json(redisresults);
        }
        const results = await bin.getBinInformmation();
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

// Get Bin By Product Brand
// module.exports. = async (req, res) => {
//     try {
//         const BinInfo = await redisClient.get('=');
//         if ( !== null) {
//             const redisresults = JSON.parse();
//             return res.status(200).json(redisresults);
//         }
//         const results = await bin.getBinByProductBrand();
//         if (results.length > 0) {
//             console.log('endpoint working');
//             return res.status(200).json(results[0]);
//         } else {
//             return res.status(404).send('');
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send('Internal Server Error');
//     }
// };

// Get Bin By Item Name


// Get Empty Bin List
