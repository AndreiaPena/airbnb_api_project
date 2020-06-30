const express = require('express');
const userCtrl = require('./routes/userCtrl');

exports.router = (function() {
    const apiRouter = express.Router();

 apiRouter.route('/signup').post(userCtrl.signup);

 return apiRouter;
})();