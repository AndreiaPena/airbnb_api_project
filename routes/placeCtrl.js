const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

module.exports = {
  addPlace: function (req, res) {

    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    if (userId < 0)
      return res.status(400).json({ 'error': "connectez-vous avant d'ajouter une place" });

    const { idCITIES, name, description, rooms, bathrooms, price_by_night, max_guests } = req.body;

    const findInformationsfromCity = models.Place.findOne({
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
        console.log('La ville:    ' + PlaceFound.City.dataValues.name);

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
