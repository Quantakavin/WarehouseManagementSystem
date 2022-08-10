const userController = require('./userController');
const userGroupController = require('./userGroupController');
const notificationGroupController = require('./notificationGroupController');
const productController = require('./productController');
const tLoanController = require('./tLoanController');
const rmaController = require('./rma.controller');
const dashboardController = require('./dashboardController');
const binsController = require('./binsController');
const resetPasswordController = require('./resetPasswordController');

module.exports = {
    userController,
    userGroupController,
    notificationGroupController,
    productController,
    tLoanController,
    rmaController,
    dashboardController,
    binsController,
    resetPasswordController
};
