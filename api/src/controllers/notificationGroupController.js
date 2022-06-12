const user = require('../services/userService');
const notificationGroup = require('../services/notificationGroupService');

module.exports.getAllNotificationGroups = async (req, res) => {
    try {
        const results = await notificationGroup.getAll();
        return res.status(200).json(results[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getNotificationGroupById = async (req, res) => {
    const notificationGroupID = req.params.id;
    try {
        let output = [];
        const results = await notificationGroup.getByID(notificationGroupID);
        if (results[0].length > 0) {
            [output] = results;
            const results2 = await notificationGroup.getNotifications(notificationGroupID);
            if (results2.length > 0) {
                [output[0].Features] = results2;
            }
            return res.status(200).send(output);
        }
        return res.status(404).json({ message: 'Cannot find notification group with that id' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getNotificationGroupByName = async (req, res) => {
    const { name } = req.query;
    try {
        const results = await notificationGroup.getByName(name);
        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        }
        return res.status(404).json({ message: 'No more results' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.createNotificationGroup = async (req, res) => {
    const { name, description, company, notifications } = req.body;
    try {
        await notificationGroup.insert(name, description, company, notifications);
        return res.status(201).json({ message: 'Notification Group created successfully!' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.updateNotificationGroup = async (req, res) => {
    const notificationGroupID = req.params.id;
    const { name, description, company, notifications } = req.body;
    try {
        const results = await notificationGroup.getByID(notificationGroupID);
        if (results[0].length > 0) {
            await notificationGroup.update(
                notificationGroupID,
                name,
                description,
                company,
                notifications
            );
            return res.status(200).json({ message: 'Notification Group updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find Notification Group with that id' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.deleteNotificationGroup = async (req, res) => {
    const notificationGroupID = req.params.id;
    try {
        const results = await notificationGroup.getByID(notificationGroupID);
        if (results[0].length > 0) {
            const results2 = await user.getByNotificationGroup(notificationGroupID);
            if (results2[0][0].Count === 0) {
                await notificationGroup.delete(notificationGroupID);
                return res
                    .status(200)
                    .json({ message: 'Notification Group deleted successfully!' });
            }
            return res.status(405).json({
                message: 'This Notification group cannot be deleted as it contains users'
            });
        }
        return res.status(404).json({ message: 'Cannot find Notification Group with that id' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
