const rmaController = require('./rma.controller');
const usersController = require('./usercontroller.js');
const userGroupsController = require('./userGroupController.js');
const notificationGroupsController = require('./notificationGroupController.js');
const tLoanController = require('./tLoanController')

module.exports = {
    rmaController,
    usersController,
    userGroupsController,
    notificationGroupsController,
    tLoanController
};
