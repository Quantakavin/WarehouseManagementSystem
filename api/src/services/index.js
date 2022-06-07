const notificationGroupsService = require('./notificationGroupService');
const userGroupsService = require('./userGroupService');
const usersService = require('./userService');
const tLoanService = require('./tLoanService');
const rmaService = require('./rma.Service');

module.exports = {
    notificationGroupsService,
    rmaService,
    userGroupsService,
    usersService,
    tloanService,
};