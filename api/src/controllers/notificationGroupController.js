const user = require('../services/userService');
const notificationGroup = require('../services/notificationGroupService');
const redisClient = require('../config/caching');

module.exports.filterNotificationGroups = async (req, res) => {
    const {
        pageSize = 5,
        pageNo = 0,
        sortColumn = null,
        sortOrder = null,
        name = null
    } = req.query;
    try {
        const results = await notificationGroup.filter(
            pageSize,
            pageNo,
            sortColumn,
            sortOrder,
            name
        );
        return res.status(200).json(results[0][0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getAllNames = async (req, res) => {
    const { name = null } = req.query;
    try {
        const results = await notificationGroup.getNames(name);
        return res.status(200).json(results[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

// module.exports.getAllNotificationGroups = async (req, res) => {
//     const { limit, page } = req.query;
//     try {
//         const notificationGroups = await redisClient.get(`notificationGroups?limit=${limit}&page=${page}`);
//         if (notificationGroups !== null) {
//             const redisresults = JSON.parse(notificationGroups);
//             return res.status(200).json(redisresults);
//         }
//         const results = await notificationGroup.getAll(limit, page);
//         redisClient.set(`notificationGroups?limit=${limit}&page=${page}`, JSON.stringify(results[0]));
//         return res.status(200).json(results[0]);
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: 'Internal Server Error!' });
//     }
// };

module.exports.getAllNotificationGroups = async (req, res) => {
    try {
        const notificationGroups = await redisClient.get('notificationGroups');
        if (notificationGroups !== null) {
            const redisresults = JSON.parse(notificationGroups);
            return res.status(200).json(redisresults);
        }
        const results = await notificationGroup.getAll();
        const finalresults = results[0].map((result) => {
            const newresult = result;
            newresult.NotiGroupDesc = result.NotiGroupDesc.replace(/<[^>]+>/g, '');
            return newresult;
        });
        console.log(finalresults);
        redisClient.set('notificationGroups', JSON.stringify(finalresults), { EX: 60 * 60 * 24 });
        return res.status(200).json(finalresults);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getNotificationGroupById = async (req, res) => {
    const notificationGroupID = req.params.id;
    try {
        const reqNotificationGroup = await redisClient.get(
            `notificationGroup#${notificationGroupID}`
        );
        if (reqNotificationGroup !== null) {
            const redisresults = JSON.parse(reqNotificationGroup);
            return res.status(200).json(redisresults);
        }
        let output = [];
        const results = await notificationGroup.getByID(notificationGroupID);
        if (results[0].length > 0) {
            [output] = results;
            const results2 = await notificationGroup.getNotifications(notificationGroupID);
            if (results2.length > 0) {
                [output[0].Features] = results2;
            }
            redisClient.set(`notificationGroup#${notificationGroupID}`, JSON.stringify(output), {
                EX: 60 * 60 * 24
            });
            return res.status(200).send(output);
        }
        return res.status(404).json({ message: 'Cannot find notification group with that id' });
    } catch (error) {
        console.log(error);
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
        redisClient.del('notificationGroups');
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
            console.log('the id is ', notificationGroupID);
            redisClient.del(`notificationGroup#${notificationGroupID}`);
            redisClient.del('notificationGroups');
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
                redisClient.del(`notificationGroup#${notificationGroupID}`);
                redisClient.del('notificationGroups');
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
