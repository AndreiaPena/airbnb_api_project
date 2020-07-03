const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

module.exports = {
  addPlace: function (req, res) {
    // const idCITIES = req.body.idCITIES;
    // const name = req.body.name;
    // const description = req.body.description;
    // const rooms = req.body.rooms;
    // const bathrooms = req.body.bathrooms;
    // const price_by_night = req.body.price_by_night;
    // const max_guests = req.body.max_guests;

    const { idCITIES, name, description, rooms, bathrooms, price_by_night, max_guests } = req.body;

    const tutu = models.Place.findOne({
      include: [
        {
          model: models.City,
          where: {
            id: idCITIES,
          },
        },
      ],
    })
      .then(function (PlaceFound) {
        console.log('ICI     ' + PlaceFound.City.dataValues.name);

        models.Place.create({
          idCITIES: idCITIES,
          name: name,
          description: description,
          rooms: rooms,
          bathrooms: bathrooms,
          price_by_night: price_by_night,
          max_guests: max_guests,
        });

        return res.status(200).json({
          city: PlaceFound.City.dataValues.name,
          name: PlaceFound.name,
          description: PlaceFound.description,
          rooms: PlaceFound.rooms,
          bathrooms: PlaceFound.bathrooms,
          price_by_night: PlaceFound.price_by_night,
          max_guests: PlaceFound.max_guests,
        });
      })
      .catch(function (err) {
        return res.status(500).json({ error: 'cannot add place' });
      });
  },
};
