const express = require('express');
const userCtrl = require('./routes/userCtrl');
const cityCtrl = require('./routes/cityCtrl');
const placeCtrl = require('./routes/placeCtrl');

exports.router = (function() {
    const apiRouter = express.Router();

 apiRouter.route('/signup').post(userCtrl.signup);
 apiRouter.route('/signin').post(userCtrl.signin);
//  apiRouter.route('/admin').post(cityCtrl.addCity);
//  apiRouter.route('/cities').get(cityCtrl.viewCity);
 apiRouter.route('/places').post(placeCtrl.addPlace);



 return apiRouter;
})();