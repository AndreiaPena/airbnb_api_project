const models = require('../models');
const Place = models.Place;
const User = models.User;
const Booking = models.Booking;

module.exports = {
  addBooking: async function (req, res) {

    const { placeId, userId, check_in, check_out } = req.body;
    

    const newBooking = await Booking.create({
      placeId,
      userId,
      check_in,
      check_out,
    });
    
    res.status(201).json({
        userId: newBooking.userId,
        placeId: newBooking.placeId,
        check_in: newBooking.check_in,
        check_out: newBooking.check_out,
      });


    // var headerAuth = req.headers['authorization'];
    // var userId = jwtUtils.getUserId(headerAuth);

    // if (userId < 0)
    //   return res
    //     .status(401)
    //     .json({ error: 'Vous devez être connecté pour accéder à cette ressource' });

    // const { placeId, userId, check_in, check_out } = req.body;

    // const place = await Place.findByPk(placeId);
    // const user = await User.findByPk(userId);

    // const test = await Booking.create({
    //   placeId,
    //   userId,
    //   check_in,
    //   check_out,
    // });

    // return res.status(200).json({
    //   place: place.id,
    //   check_in,
    //   check_out,
    // });
  },
};
