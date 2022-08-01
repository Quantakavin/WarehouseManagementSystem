const notificationFeature = require('../services/notificationFeatureService');
const redisClient = require('../config/caching');

module.exports.getAllNotificationFeatures = async (req, res) => {
    try {
        const notificationfeatures = await redisClient.get('notificationfeatures');
        if (notificationfeatures !== null) {
            const redisresults = JSON.parse(notificationfeatures);
            return res.status(200).json(redisresults);
        }
        const results = await notificationFeature.getAll();
        redisClient.set('notificationfeatures', JSON.stringify(results[0]), { EX: 60 * 60 * 24 });
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getAllNotificationTypes = async (req, res) => {
    try {
        const notificationtypes = await redisClient.get('notificationtypes');
        if (notificationtypes !== null) {
            const redisresults = JSON.parse(notificationtypes);
            return res.status(200).json(redisresults);
        }
        const results = await notificationFeature.getAllTypes();
        redisClient.set('notificationtypes', JSON.stringify(results[0]), { EX: 60 * 60 * 24 });
        return res.status(200).json(results[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
