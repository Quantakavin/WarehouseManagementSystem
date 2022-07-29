const userService = require('./userService');
const userGroupService = require('./userGroupService');
const notificationGroupService = require('./notificationGroupService');
const productService = require('./productService');
const tLoanService = require('./tLoanService');
const rmaService = require('./rma.service');
const resetPasswordService = require('./resetPasswordService');

module.exports = {
    userService,
    userGroupService,
    notificationGroupService,
    productService,
    tLoanService,
    rmaService,
    resetPasswordService
};
