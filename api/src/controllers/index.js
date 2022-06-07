
const notificationGroupsController = require('./notificationGroupController');
const userGroupsController = require('./userGroupController');
const usersController = require('./userController');
const tLoanController = require('./tLoanController');
const rmaController = require('./rma.controller');

module.exports = {
    notificationGroupsController,
    rmaController,
    userGroupsController,
    usersController,
    tLoanController,
};
