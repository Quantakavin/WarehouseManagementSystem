const notificationGroup = require('../services/notificationGroupService')

module.exports.getAllNotificationGroups = async (req, res) => {
    try {
        const results = await notificationGroup.getAll()
        return res.status(200).json(results[0])
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.getNotificationGroupById = async (req, res) => {
    const notificationGroupID = req.params.id
    try {
        const results = await notificationGroup.getByID(notificationGroupID)
        if (results[0].length > 0) {
            output = results[0];
            const results2 = await notificationGroup.getNotifications(notificationGroupID)
            if (results2.length > 0) {
                output[0].Features = results2[0]
            } 
            return res.status(200).send(output)
        } else {
            return res.status(404).json({ message: 'Cannot find notification group with that id' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.getNotificationGroupByName = async (req, res) => {
    const { name } = req.query
    try {
        const results = await notificationGroup.getByName(name)
        if (results[0].length > 0) {
            return res.status(200).send(results[0])
        } else {
            return res.status(404).json({ message: 'No more results' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

module.exports.createNotificationGroup = async (req, res) => {
    
}

module.exports.updateNotificationGroup = async (req, res) => {
    
}


module.exports.deleteNotificationGroup = async (req, res) => {
    
}
