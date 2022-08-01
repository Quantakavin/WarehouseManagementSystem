const feature = require('../services/featureService');
const redisClient = require('../config/caching');

module.exports.getAllFeatures = async (req, res) => {
    try {
        const features = await redisClient.get('features');
        if (features !== null) {
            const redisresults = JSON.parse(features);
            return res.status(200).json(redisresults);
        }
        const results = await feature.getAll();
        redisClient.set('features', JSON.stringify(results[0]), { EX: 60 * 60 * 24 });
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getAllFeatureRights = async (req, res) => {
    try {
        const featurerights = await redisClient.get('featurerights');
        if (featurerights !== null) {
            const redisresults = JSON.parse(featurerights);
            return res.status(200).json(redisresults);
        }
        const results = await feature.getAllRights();
        redisClient.set('featurerights', JSON.stringify(results[0]), { EX: 60 * 60 * 24 });
        return res.status(200).json(results[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
