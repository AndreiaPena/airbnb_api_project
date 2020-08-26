const models = require('../models');
const Place = models.Place;
const User = models.User;
const Booking = models.Booking;
const jwtUtils = require('../utils/jwt.utils');
const { OK, CREATED} = require('../helpers/status_codes');
const { UnauthorizedError } = require('../helpers/errors');

module.exports = {
  addBooking: async function (req, res) {
    var headerAuth = req.headers['authorization'];
    var userIdAuth = jwtUtils.getUserId(headerAuth);

    if (userIdAuth < 0) {
      throw new UnauthorizedError(
        'Non autorisé',
        'Vous devez être connecté pour accéder à cette ressource.'
      );
    }

    const { placeId, userId, check_in, check_out } = req.body;

    const place = await Place.findByPk(placeId);
    const user = await User.findByPk(userId);

    console.log(Booking);
    const test = await Booking.create({
      placeId,
      userId,
      check_in,
      check_out,
    });

    return res.status(OK).json({
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      place: {
        id: place.id,
        name: place.name,
        rooms: place.rooms,
        bathrooms: place.bathrooms,
        description: place.description,
        max_guests: place.max_guests,
        price_by_night: place.price_by_night,
      },
      check_in,
      check_out,
    });
  },

  getBookings: async (req, res) => {
    const bookingsFound = await Booking.findAll({
      attributes: ['id', 'check_in', 'check_out'],
      where: {
        user_id: userId,
      },
      include: [
        {
          model: Place,
          attributes: [
            'id',
            'name',
            'description',
            'rooms',
            'bathrooms',
            'max_guests',
            'price_by_night',
          ],
          include: [
            {
              model: City,
              attributes: ['name'],
            },
          ],
        },
      ],
      raw: true,
      order: [['check_in', 'DESC']],
    });
    res.status(CREATED).json(bookingsFound);
  },
};
