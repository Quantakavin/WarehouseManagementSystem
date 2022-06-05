const rmaController = require('./rma.controller');
const notificationGroupsController = require('./notifcationGroups.controller');
const userGroupsController = require('./userGroups.controller');
const usersController = require('./users.controller');
const tLoanController = require('./tLoanController')

module.exports = {
    notifcationGroupsController,
    rmaController,
    userGroupsController,
    usersController,
    tLoanController,
};
