const notification = require('../services/notificationService');
// const redisClient = require('../config/caching');

module.exports.createNotification = async (NotiFeatureID, ReceiverID, ContentID = null) => {
    // const { NotiFeatureID, ReceiverID } = req.body;
    try {
        await notification.insert(NotiFeatureID, ReceiverID, ContentID);
        return null;
    } catch (error) {
        return null;
    }
};

module.exports.getAllNotifications = async (req, res) => {
    const UserID = req.params.id;
    try {
        const results = await notification.getById(UserID);
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.markReadNotifications = async (req, res) => {
    const UserID = req.params.id;
    try {
        await notification.markAllAsRead(UserID);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
