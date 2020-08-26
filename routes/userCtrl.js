const express = require('express');
require('express-async-errors');
const bcrypt = require('bcrypt');
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const { OK } = require('../helpers/status_codes');
const {
  BadRequestError,
  ServerError,
  ConflictError,
  ForbiddenError,
} = require('../helpers/errors');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;
const FIRSTNAME_REGEX = /^[a-zA-Z]{1,}$/;

module.exports = {
  signup: function (req, res) {
    const { email, first_name, last_name, password, role } = req.body;

    if (first_name == null || last_name == null) {
      throw new BadRequestError(
        'Mauvaise Requête',
        'Les champs first name et/ou name ne sont pas renseignés , veuillez recommencer.'
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      throw new BadRequestError(
        'Mauvaise Requête',
        "L'e-mail n'est pas valide, veuillez recommencer."
      );
    }

    if (!PASSWORD_REGEX.test(password)) {
      throw new BadRequestError(
        'Mauvaise Requête',
        'Mot de passe invalide (doit avoir une longueur de 4 à 8 caractères et inclure au moins un chiffre), veuillez recommencer.'
      );
    }

    if (!FIRSTNAME_REGEX.test(first_name)) {
      throw new BadRequestError(
        'Mauvaise Requête',
        'Le champ first name doit être une chaîne de caractères'
      );
    }

    models.User.findOne({
      attributes: ['email'],
      where: { email: email },
    })
      .then( function (userFound) {
        if (!userFound) {
          bcrypt.hash(password, 5, function (err, bcryptedPassword) {
            const newUser = models.User.create({
              email: email,
              first_name: first_name,
              last_name: last_name,
              password: bcryptedPassword,
              role: role,
            })
              .then( function (newUser) {
                return res.status(OK).json({
                  email: newUser.email,
                  first_name: newUser.first_name,
                  last_name: newUser.last_name,
                  role: newUser.role,
                });
              })
              .catch(function (err) {
                throw new ServerError('Erreur Serveur', "Impossible d'ajouter cet utilisateur.");
              });
          });
        }  else {
          console.log("hello");
           throw new ConflictError('Conflit', 'Cet utilisateur existe déjà.');
          // return res.status(409).json({ error: 'user already exist' });
        }
      })
      .catch(function (err) {
        console.log("haha");
        throw new ServerError('Erreur Serveur', 'Impossible de vérifier cet utilisateur.');
      });
  },
  signin: function (req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    if (email == null || password == null) {
      throw new BadRequestError(
        'Mauvaise Requête',
        'Les champs e-mail et/ou mot de passes sont manquants, veuillez recommencer.'
      );
    }

    models.User.findOne({
      where: { email: email },
    })
      .then(function (userFound) {
        if (userFound) {
          bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
            if (resBycrypt) {
              return res.status(OK).json({
                user: {
                  id: userFound.id,
                  email: userFound.email,
                  first_name: userFound.first_name,
                  last_name: userFound.last_name,
                  role: userFound.role,
                },
                token: jwtUtils.generateTokenForUser(userFound),
              });
            } else {
              // return res.status(403).json({ error: 'invalid password' });
              throw new ForbiddenError(
                'Accès refusé',
                'Le mot de passe est incorrect, veuillez recommencer.'
              );
            }
          });
        } else {
          throw new BadRequestError(
            'Mauvaise Requête',
            "Cet utilisateur n'existe pas dans la DB airbnb_api"
          );
        }
      })
      .catch(function (err) {
        throw new ServerError('Erreur Serveur', 'Impossible de vérifier cet utilisateur.');
      });
  },
};
