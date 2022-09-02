const redisClient = require('../config/caching');
const bin = require('../services/binsService');

// Get Bin By Bin Tag
module.exports.binTag = async (req, res) => {
    const { BinTag } = req.params;
    try {
        const searchBinTag = await redisClient.get(`BinTag#${BinTag}`);
        if (searchBinTag !== null) {
            const redisresults = JSON.parse(searchBinTag);
            return res.status(200).json(redisresults);
        }
        const results = await bin.getBinByBinTag(BinTag);
        redisClient.set(`BinTag#${BinTag}`, JSON.stringify(results[0]));

        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('There is no such BinTag');
    } catch (error) {
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
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('There is no such BinInfo');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.getAllBrandNames = async (req, res) => {
    const { name = null } = req.query;

    try {
        const brands = await redisClient.get(`brands#${name}`);
        if (brands != null) {
            const redisresults = JSON.parse(brands);
            return res.status(200).json(redisresults);
        }
        const results = await bin.getBrandNames(name);
        redisClient.set(`brands#${name}`, JSON.stringify(results[0]), 'EX', 60 * 60 * 24);
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.emptyBins = async (req, res) => {
    try {
        const emptyBins = await redisClient.get(`emptybins`);
        if (emptyBins != null) {
            const redisresults = JSON.parse(emptyBins);
            return res.status(200).json(redisresults);
        }
        const results = await bin.getEmptyBins();
        redisClient.set(`emptybins`, JSON.stringify(results[0]), 'EX', 60 * 60 * 24);
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

// Get Bin By Product Brand
module.exports.brand = async (req, res) => {
    const { Brand } = req.params;
    try {
        const searchBrand = await redisClient.get(`Brand#${Brand}-Bins`);
        if (searchBrand !== null) {
            const redisresults = JSON.parse(searchBrand);
            return res.status(200).json(redisresults);
        }
        const results = await bin.getBinByProductBrand(Brand);
        redisClient.set(`Brand#${Brand}-Bins`, JSON.stringify(results[0]));

        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

// Get Bin By Item Name
module.exports.ItemName = async (req, res) => {
    const { ItemName } = req.params;
    try {
        const searchItemName = await redisClient.get(`ItemName#${ItemName}`);
        if (searchItemName !== null) {
            const redisresults = JSON.parse(searchItemName);
            return res.status(200).json(redisresults);
        }
        const results = await bin.getBinByProductName(ItemName);
        redisClient.set(`ItemName#${ItemName}`, JSON.stringify(results[0]));

        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

// Get Bin Location, Items, Item Compmany, Capacity by Bin Tag
module.exports.BinProducts = async (req, res) => {
    const { BinTag } = req.params;
    try {
        const searchBinTag = await redisClient.get(`BinTag#${BinTag}`);
        if (searchBinTag !== null) {
            const redisresults = JSON.parse(searchBinTag);
            return res.status(200).json(redisresults);
        }
        const results = await bin.getBinByProductName(BinTag);
        redisClient.set(`BinTag#${BinTag}`, JSON.stringify(results[0]));

        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

// Get Amount of Items in Bin
module.exports.BinQtyBrand = async (req, res) => {
    const { Brand } = req.params;
    try {
        const searchBrand = await redisClient.get(`Brand#${Brand}`);
        if (searchBrand !== null) {
            const redisresults = JSON.parse(searchBrand);
            return res.status(200).json(redisresults);
        }
        const results = await bin.getBinItemsByBrand(Brand);
        redisClient.set(`Brand#${Brand}`, JSON.stringify(results[0]));

        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('');
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.BinQtyBinID = async (req, res) => {
    const { BinID } = req.params;
    try {
        const searchBinID = await redisClient.get(`BinID#${BinID}`);
        if (searchBinID !== null) {
            const redisresults = JSON.parse(searchBinID);
            return res.status(200).json(redisresults);
        }
        const results = await bin.getBinItemsByBrand(BinID);
        redisClient.set(`BinID#${BinID}`, JSON.stringify(results[0]));

        if (results.length > 0) {
            return res.status(200).json(results[0]);
        }
        return res.status(404).send('');
    } catch (error) {
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
