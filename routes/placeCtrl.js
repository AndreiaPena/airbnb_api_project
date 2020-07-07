const models = require('../models');
const Place = models.Place;
const City = models.City;
const jwtUtils = require('../utils/jwt.utils');
const NOSTRING_REGEX = /^\d+$/;

module.exports = {
  addPlace: async function (req, res) {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0)
      return res
        .status(401)
        .json({ error: 'Vous devez être connecté pour accéder à cette ressource' });

    const { idCITIES, name, description, rooms, bathrooms, price_by_night, max_guests } = req.body;

    if (description === null || description === undefined) {
      return res.status(400).json({ error: "Le champ description n'est pas renseigné" });
    }
    if (
      !NOSTRING_REGEX.test(rooms) ||
      !NOSTRING_REGEX.test(bathrooms) ||
      !NOSTRING_REGEX.test(max_guests)
    ) {
      return res.status(400).json({ error: 'Le champ doit être un nombre entier' });
    }

    const city = await City.findByPk(idCITIES);

    const place = await Place.create({
      idCITIES,
      name,
      description,
      rooms,
      bathrooms,
      max_guests,
      price_by_night,
    });

    return res.status(200).json({
      city: city.name,
      name,
      description,
      rooms,
      bathrooms,
      max_guests,
      price_by_night,
    });
    
  },
  getAllPlaces: function (req, res) {
    Place.findAll({
      include: [
        {
          model: City,
          attributes: ['name'],
        },
      ],
      raw: true,
      attributes: [
        'id',
        'name',
        'description',
        'rooms',
        'bathrooms',
        'max_guests',
        'price_by_night',
      ],
    }).then(function (test) {
      return res.status(200).json(test);
    });
  },
};
