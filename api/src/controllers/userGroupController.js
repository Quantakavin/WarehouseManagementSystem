const user = require('../services/userService');
const userGroup = require('../services/userGroupService');
const redisClient = require('../config/caching');

// module.exports.getAllUserGroups = async (req, res) => {
//     try {
//         const results = await userGroup.getAll();
//         return res.status(200).json(results[0][0]);
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: 'Internal Server Error!' });
//     }
// };

module.exports.getAllUserGroups = async (req, res) => {
    try {
        const userGroups = await redisClient.get('userGroups');
        if (userGroups !== null) {
            const redisresults = JSON.parse(userGroups);
            return res.status(200).json(redisresults);
        }
        const results = await userGroup.getAll();
        const finalresults = results[0].map((result) => {
            const newresult = result;
            newresult.UserGroupDesc = result.UserGroupDesc.replace(/<[^>]+>/g, '');
            // r.UserGroupDesc = r.UserGroupDesc.replace(/<[^>]+>/g, '');
            return newresult;
        });
        console.log(finalresults);
        redisClient.set('userGroups', JSON.stringify(finalresults), { EX: 60 * 60 * 24 });
        return res.status(200).json(finalresults);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.filterUserGroups = async (req, res) => {
    const {
        pageSize = 5,
        pageNo = 0,
        sortColumn = null,
        sortOrder = null,
        name = null
    } = req.query;
    try {
        const results = await userGroup.filter(pageSize, pageNo, sortColumn, sortOrder, name);
        return res.status(200).json(results[0][0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getAllNames = async (req, res) => {
    const { name = null } = req.query;
    try {
        const results = await userGroup.getNames(name);
        return res.status(200).json(results[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

// module.exports.getAllUserGroups = async (req, res) => {
//     const { limit, page } = req.query;
//     try {
//         const usergroups = await redisClient.get(`userGroups?limit=${limit}&page=${page}`);
//         if (usergroups !== null) {
//             const redisresults = JSON.parse(usergroups);
//             return res.status(200).json(redisresults);
//         }
//         const results = await userGroup.getAll(limit, page);
//         redisClient.set(`userGroups?limit=${limit}&page=${page}`, JSON.stringify(results[0]));
//         return res.status(200).json(results[0]);
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: 'Internal Server Error!' });
//     }
// };

module.exports.getUserGroupById = async (req, res) => {
    const userGroupID = req.params.id;
    try {
        const reqUserGroup = await redisClient.get(`userGroup#${userGroupID}`);
        if (reqUserGroup !== null) {
            const redisresults = JSON.parse(reqUserGroup);
            return res.status(200).json(redisresults);
        }
        const results = await userGroup.getByID(userGroupID);
        let output = [];
        if (results[0].length > 0) {
            [output] = results;
            const results2 = await userGroup.getFeatures(userGroupID);
            if (results2.length > 0) {
                [output[0].Features] = results2;
            }
            redisClient.set(`userGroup#${userGroupID}`, JSON.stringify(output), {
                EX: 60 * 60 * 24
            });
            return res.status(200).json(output);
        }
        return res.status(404).json({ message: 'Cannot find user group with that id' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getUserGroupById2 = async (req, res) => {
    const userGroupID = req.params.id;
    try {
        const results = await userGroup.getByID(userGroupID);
        let output = [];
        if (results[0].length > 0) {
            [output] = results;
            return res.status(200).json(output[0]);
        }
        return res.status(404).json({ message: 'Cannot find user group with that id' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.getUserGroupByName = async (req, res) => {
    const { name } = req.query;
    try {
        const results = await userGroup.getByName(name);
        if (results[0].length > 0) {
            return res.status(200).send(results[0]);
        }
        return res.status(404).json({ message: 'No more results' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.createUserGroup = async (req, res) => {
    const { name, description, features } = req.body;
    console.log('features are', features);
    try {
        await userGroup.insert(name, description, features);
        redisClient.del('userGroups');
        return res.status(201).json({ message: 'User Group created successfully!' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.updateUserGroup = async (req, res) => {
    const userGroupID = req.params.id;
    const { name, description, features } = req.body;
    try {
        const results = await userGroup.getByID(userGroupID);
        if (results[0].length > 0) {
            await userGroup.update(userGroupID, name, description, features);
            redisClient.del(`userGroup#${userGroupID}`);
            return res.status(200).json({ message: 'User Group updated successfully!' });
        }
        return res.status(404).json({ message: 'Cannot find User Group with that id' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports.deleteUserGroup = async (req, res) => {
    const userGroupID = req.params.id;
    try {
        const results = await userGroup.getByID(userGroupID);
        if (results[0].length > 0) {
            const results2 = await user.getByUserGroup(userGroupID);
            if (results2[0][0].Count === 0) {
                await userGroup.delete(userGroupID);
                redisClient.del('userGroups');
                return res.status(200).json({ message: 'User Group deleted successfully!' });
            }
            return res
                .status(405)
                .json({ message: 'This user group cannot be deleted as it contains users' });
        }
        return res.status(404).json({ message: 'Cannot find User Group with that id' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};
