const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const NOSTRING_REGEX = /^\d+$/;

module.exports = {
  addPlace: function (req, res) {

    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);
    var userRole      = jwtUtils.getUserRole(headerAuth);

    if (userId < 0)
      return res.status(401).json({ error: "Vous devez être connecté pour accéder à cette ressource" });
      if (userRole  < 0)
      return res.status(403).json({ error: "Vous n'êtes pas autorisé à accéder à cette ressource" });

    const { idCITIES, name, description, rooms, bathrooms, price_by_night, max_guests } = req.body;

    if (description == null || description  == undefined) {
      return res.status(400).json({ error: "Le champ description n'est pas renseigné" });
    }
    if (!NOSTRING_REGEX.test(rooms) || !NOSTRING_REGEX.test(bathrooms) || !NOSTRING_REGEX.test(max_guests) ) {
      return res.status(400).json({ error: 'Le champ doit être un nombre entier' });
    }

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
          city: PlaceFound.City.name,
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
  sharePlace : function (req, res){
    models.Place.findAll({
      attributes: [ 'id', 
      'name', 
      'idCITIES', 
      'description', 
      'rooms', 
      'bathrooms',
      'price_by_night',
      'max_guests' ]
    }).then(function(user) {
      if (user) {
        res.status(201).json(user);
      } else {
        res.status(404).json({ 'error': 'user not found' });
      }
    }).catch(function(err) {
      res.status(500).json({ 'error': 'cannot fetch user' });
    });
  }
};
