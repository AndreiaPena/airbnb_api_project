const express = require('express');
require('express-async-errors');
const models = require('../models');
const Place = models.Place;
const City = models.City;
const User = models.User;
const jwtUtils = require('../utils/jwt.utils');
const NOSTRING_REGEX = /^\d+$/;
const { OK, CREATED } = require('../helpers/status_codes');
const { BadRequestError, UnauthorizedError } = require('../helpers/errors');

module.exports = {
  addPlace: async function (req, res) {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
      throw new UnauthorizedError(
        'Non autorisé',
        'Vous devez être connecté pour accéder à cette ressource.'
      );
      // return res
      // .status(401)
      // .json({ error: 'Vous devez être connecté pour accéder à cette ressource' });
    };

    const {
      cityName,
      name,
      description,
      rooms,
      bathrooms,
      price_by_night,
      max_guests,
      pictures,
    } = req.body;

    if (description === null || description === undefined) {
      throw new BadRequestError(
        'Mauvaise Requête',
        "Le champ description n'est pas renseigné, veuillez recommencer."
      );
    }
    if (
      !NOSTRING_REGEX.test(rooms) ||
      !NOSTRING_REGEX.test(bathrooms) ||
      !NOSTRING_REGEX.test(max_guests)
    ) {
      throw new BadRequestError('Mauvaise Requête', 'Le champ doit être un nombre entier.');
    }
    const city = await City.findOne({ where: { name: cityName } });
    //vérifier si la ville existe!!!!
    // const city = await City.findByPk(idCITIES);
    const user = await User.findByPk(userId);

    const place = await Place.create({
      idCITIES: city.id,
      userId,
      name,
      description,
      rooms,
      bathrooms,
      max_guests,
      price_by_night,
      pictures,
    });

    return res.status(OK).json({
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
    return res.status(CREATED).json(findPlaces);
  },

  getOnePlace: async (req, res) => {
    const { id } = req.params;
    const placeOne = await Place.findByPk(id, {
      include: [
        {
          model: City,
          attributes: ['name'],
        },
      ],
      raw: true,
    });
    return res.status(CREATED).json(placeOne);
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
