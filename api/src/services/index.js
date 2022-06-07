const userService = require('./userService.js');
const userGroupService = require('./userGroupService.js');
const notificationGroupService = require('./notificationGroupService.js');
const productService = require('./productService.js');
const tLoanService = require('./tLoanService');
const rmaService = require('./rma.service');

module.exports = {
    userService,
    userGroupService,
    notificationGroupService,
    productService,
    tLoanService,
    rmaService
};