const models = require('../models');
const Place = models.Place;
const City = models.City;
const jwtUtils = require('../utils/jwt.utils');
const NOSTRING_REGEX = /^\d+$/;

module.exports = {
  addPlace: function  (req, res) {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);
    

    if (userId < 0)
      return res.status(401).json({ error: 'Vous devez être connecté pour accéder à cette ressource' });
    
    const { idCITIES, name, description, rooms, bathrooms, price_by_night, max_guests } = req.body;

    if (description == null || description == undefined) {
      return res.status(400).json({ error: "Le champ description n'est pas renseigné" });
    }
    if (
      !NOSTRING_REGEX.test(rooms) ||
      !NOSTRING_REGEX.test(bathrooms) ||
      !NOSTRING_REGEX.test(max_guests)
    ) {
      return res.status(400).json({ error: 'Le champ doit être un nombre entier' });
    }

    Place.findOne({ where: { id: idCITIES }, include: City })
    .then(function (PlaceFound) {
      console.log(PlaceFound.City.dataValues.name)

        Place.create({
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
        console.log(err)
        return res.status(500).json({ error: 'cannot add place' });
      });
  },
  sharePlace : function (req, res){

    // Place.findAll({
    //   include: [
    //     {
    //       model: City,
    //       attributes: ['name'],
    //     },
    //   ],
    //   raw: true,
    //   attributes: [
    //     'id',
    //     'name',
    //     'description',
    //     'rooms',
    //     'bathrooms',
    //     'max_guests',
    //     'price_by_night',
    //   ],
    // })
    // .then(function (test) {
    //   return res.status(200).json(test);
    // })
  }
}
