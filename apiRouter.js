const express = require('express');
const userCtrl = require('./routes/userCtrl');
const placeCtrl = require('./routes/placeCtrl');
const bookingCtrl = require('./routes/bookingCtrl');
const { request } = require('express');

exports.router = (function () {
  const apiRouter = express.Router();

  apiRouter.route('/signup').post(userCtrl.signup);
  apiRouter.route('/signin').post(userCtrl.signin);

  apiRouter.route('/bookings').post(bookingCtrl.addBooking);
  apiRouter.route('/bookings').get(bookingCtrl.getBookings);

  apiRouter.route('/places').post(placeCtrl.addPlace); 

  apiRouter.route('/places').get(placeCtrl.getAllPlaces);
  apiRouter.route('/places/:id').get(placeCtrl.getOnePlace);

  apiRouter.route('/places/:id').patch(placeCtrl.getUpdatePlace);
  apiRouter.route('/places/:id').delete(placeCtrl.getDeletePlace);

  return apiRouter;
})();
