const models = require('../models');
const Place = models.Place;
const City = models.City;
const User = models.User;
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
    const user = await User.findByPk(userId);

    const place = await Place.create({
      idCITIES,
      userId,
      name,
      description,
      rooms,
      bathrooms,
      max_guests,
      price_by_night,
      pictures,
    });

    return res.status(200).json({
      city: city.name,
      user: user.id,
      name,
      description,
      rooms,
      bathrooms,
      max_guests,
      price_by_night,
      pictures,
    });
  },

  getAllPlaces: async function (req, res) {
    const where = {};
    if (req.query.city) {
      const cityFound = await City.findOne({
        where: { name: req.query.city },
        attributes: ['id'],
        raw: true,
      });
      where.idCITIES = cityFound.id;
    }
    const findPlaces = await Place.findAll({
      include: [
        {
          model: City,
          attributes: ['name'],
        },
        { model: User, attributes: ['id'] },
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
        'pictures',
      ],
      where,
    });
    return res.status(201).json(findPlaces);
  },

  getOnePlace: async (req, res) => {
    const { id } = req.params;
    const placeOne = await Place.findByPk(id, {
      include: [
        {
          model: City,
          attributes: ['name'],
        }
      ],
      raw: true
    });
    return res.status(201).json(placeOne);
  },

  getUpdatePlace: async function (req, res) {
    const { id } = req.params;
    const newData = req.body;
    await Place.findOne({ where: { id: id } }).then((place) => {
      place.update(newData).then((newData) => {
        res.json(newData);
      });
    });
  },

  getDeletePlace: async function (req, res) {
    const { id } = req.params;

    await Place.destroy({
      where: { id: id },
    }).then(() => {
      res.send('Place Effacé');
    });
  },
};
