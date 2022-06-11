const user = require('../services/userService')
const userGroup = require('../services/userGroupService')

module.exports.getAllUserGroups = async (req, res) => {
    try {
        const results = await userGroup.getAll()
        return res.status(200).json(results[0])
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.getUserGroupById = async (req, res) => {
    const userGroupID = req.params.id
    try {
        const results = await userGroup.getByID(userGroupID)
        if (results[0].length > 0) {
            output = results[0];
            const results2 = await userGroup.getFeatures(userGroupID)
            if (results2.length > 0) {
                output[0].Features = results2[0]
            } 
            return res.status(200).send(output)
        } else {
            return res.status(404).json({ message: 'Cannot find user group with that id' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.getUserGroupByName = async (req, res) => {
    const { name } = req.query
    try {
        const results = await userGroup.getByName(name)
        if (results[0].length > 0) {
            return res.status(200).send(results[0])
        } else {
            return res.status(404).json({ message: 'No more results' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.createUserGroup = async (req, res) => {
    const { name, description, features } = req.body
    try {
        await userGroup.insert(name, description, features)
        return res.status(201).json({ message: 'User Group created successfully!' })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.updateUserGroup = async (req, res) => {
    const userGroupID = req.params.id
    const { name, description, features } = req.body
    try {
        const results = await userGroup.getByID(userGroupID)
        if (results[0].length > 0) {
            await userGroup.update(userGroupID, name, description, features)
            return res.status(200).json({ message: 'User Group updated successfully!' })
        } else {
            return res.status(404).json({ message: 'Cannot find User Group with that id' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.deleteUserGroup = async (req, res) => {
    const userGroupID = req.params.id
    try {
        const results = await userGroup.getByID(userGroupID);
        if (results[0].length > 0) {
            const results2 = await user.getByUserGroup(userGroupID);
            if (results2[0][0].Count == 0) {
                await userGroup.delete(userGroupID)
                return res.status(200).json({ message: 'User Group deleted successfully!' })
            } else {
                return res.status(405).json({ message: 'This user group cannot be deleted as it contains users' })
            }
        } else {
            return res.status(404).json({ message: 'Cannot find User Group with that id' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

