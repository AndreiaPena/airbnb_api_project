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
  addPlace: async (request, response) => {
    var headerAuth = request.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
      throw new UnauthorizedError(
        'Non autorisé',
        'Vous devez être connecté pour accéder à cette ressource.'
      );
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
    } = request.body;

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

    return response.status(OK).json({
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

  getAllPlaces: async (request, response) => {
    const where = {};
    if (request.query.city) {
      const cityFound = await City.findOne({
        where: { name: request.query.city },
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
    return response.status(CREATED).json(findPlaces);
  },

  getOnePlace: async (request, response) => {
    const { id } = request.params;
    const placeOne = await Place.findByPk(id, {
      include: [
        {
          model: City,
          attributes: ['name'],
        },
      ],
      raw: true,
    });
    return response.status(CREATED).json(placeOne);
  },

  getUpdatePlace: async function (request, response) {
    const { id } = request.params;
    const newData = request.body;
    await Place.findOne({ where: { id: id } }).then((place) => {
      place.update(newData).then((newData) => {
        response.json(newData);
      });
    });
  },

  getDeletePlace: async (request, response) => {
    const { id } = request.params;

    await Place.destroy({
      where: { id: id },
    }).then(() => {
      response.send('Place Effacé');
    });
  },
};
