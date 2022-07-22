const redisClient = require('../config/caching');
const bin = require('../services/binsService');

//Get Bin By Bin Tag
module.exports.binTag = async (req, res) => {
    let BinTag = req.params.BinTag;
    try {
        const searchBinTag = await redisClient.get(`BinTag#${BinTag}`);
        if (searchBinTag !== null) {
            const redisresults = JSON.parse(searchBinTag);
            console.log('bintag 1 working');
            console.log(BinTag);
            return res.status(200).json(redisresults);
        }
        const results = await bin.getBinByBinTag(BinTag);
        redisClient.set(`BinTag#${BinTag}`, JSON.stringify(results[0]));

        if (results.length > 0) {
            console.log('bintag working');
            return res.status(200).json(results);
        } else {
            return res.status(404).send('There is no such BinTag');
        }
    } catch (error) {
        console.log('bintag not working');
        return res.status(500).send('Internal Server Error');
    }
};

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

//Get Bin By Product Brand
module.exports.brand = async (req, res) => {
    let Brand = req.params.Brand;
    try {
        const searchBrand = await redisClient.get(`Brand#${Brand}`);
        if (searchBrand !== null) {
            const redisresults = JSON.parse(searchBrand);
            return res.status(200).json(redisresults);
        }
        const results = await bin.getBinByProductBrand(Brand);
        redisClient.set(`Brand#${Brand}`, JSON.stringify(results[0]));

        if (results.length > 0) {
            console.log('endpoint working');
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

// Get Bin By Item Name
module.exports.ItemName = async (req, res) => {
    let ItemName = req.params.ItemName;
    try {
        const searchItemName = await redisClient.get(`ItemName#${ItemName}`);
        if (searchItemName !== null) {
            const redisresults = JSON.parse(searchItemName);
            return res.status(200).json(redisresults);
        }
        const results = await bin.getBinByProductName(ItemName);
        redisClient.set(`ItemName#${ItemName}`, JSON.stringify(results[0]));

        if (results.length > 0) {
            console.log('endpoint working');
            console.log(results);
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

// Get Bin Location, Items, Item Compmany, Capacity by Bin Tag
module.exports.BinProducts = async (req, res) => {
    let BinTag = req.params.BinTag;
    try {
        const searchBinTag = await redisClient.get(`BinTag#${BinTag}`);
        if (searchBinTag !== null) {
            const redisresults = JSON.parse(searchBinTag);
            return res.status(200).json(redisresults);
        }
        const results = await bin.getBinByProductName(BinTag);
        redisClient.set(`BinTag#${BinTag}`, JSON.stringify(results[0]));

        if (results.length > 0) {
            console.log('endpoint working');
            console.log(results);
            return res.status(200).json(results[0]);
        } else {
            return res.status(404).send('');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

// Get Empty Bin List
// module.exports.BinProducts = async (req, res) => {
//     let BinTag = req.params.BinTag;
//     try {
//         const searchBinTag = await redisClient.get(`BinTag#${BinTag}`);
//         if (searchBinTag !== null) {
//             const redisresults = JSON.parse(searchBinTag);
//             return res.status(200).json(redisresults);
//         }
//         const results = await bin.getBinByProductName(BinTag);
//         redisClient.set(`BinTag#${BinTag}`, JSON.stringify(results[0]));

//         if (results.length > 0) {
//             console.log('endpoint working');
//             console.log(results);
//             return res.status(200).json(results[0]);
//         } else {
//             return res.status(404).send('');
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send('Internal Server Error');
//     }
// }
