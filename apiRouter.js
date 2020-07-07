const express = require('express');
const userCtrl = require('./routes/userCtrl');
const cityCtrl = require('./routes/cityCtrl');
const placeCtrl = require('./routes/placeCtrl');

exports.router = (function() {
    const apiRouter = express.Router();

 apiRouter.route('/signup').post(userCtrl.signup);
 apiRouter.route('/signin').post(userCtrl.signin);
//  apiRouter.route('/cities').get(cityCtrl.viewCity);  penser à finir la route get de cities
 apiRouter.route('/places').post(placeCtrl.addPlace);
 apiRouter.route('/places').get(placeCtrl.getAllPlaces);



 return apiRouter;
})();