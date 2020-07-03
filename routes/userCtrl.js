const bcrypt = require('bcrypt');
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;
const FIRSTNAME_REGEX = /^[a-zA-Z]{1,}$/;

module.exports = {
  signup: function (req, res) {
    // const email = req.body.email;
    // const first_name = req.body.first_name;
    // const last_name = req.body.last_name;
    // const password = req.body.password;
    // const role = req.body.role;
    const { email, first_name, last_name, password, role } = req.body;
    console.log('email ' + req.body.email);
    console.log('role ' + req.body.role);
    console.log('password ' + req.body.password);
    console.log('fn ' + req.body.first_name);
    console.log('ln ' + req.body.last_name);

    if (first_name == null || last_name == null) {
      return res.status(400).json({ error: 'missing parameters' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'email is not valid' });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res
        .status(400)
        .json({ error: 'password invalid (must length 4 - 8 and include 1 number at least)' });
    }

    if (!FIRSTNAME_REGEX.test(first_name)) {
      return res.status(400).json({ error: 'il faut une chaine de caractères' });
    }

    models.User.findOne({
      attributes: ['email'],
      where: { email: email },
    })
      .then(function (userFound) {
        if (!userFound) {
          bcrypt.hash(password, 5, function (err, bcryptedPassword) {
            const newUser = models.User.create({
              email: email,
              first_name: first_name,
              last_name: last_name,
              password: bcryptedPassword,
              role: role,
            })
              .then(function (newUser) {
                return res.status(200).json({
                  email: newUser.email,
                  first_name: newUser.first_name,
                  last_name: newUser.last_name,
                  role: newUser.role,
                });
              })
              .catch(function (err) {
                return res.status(500).json({ error: 'cannot add user' });
              });
          });
        } else {
          return res.status(409).json({ error: 'user already exist' });
        }
      })
      .catch(function (err) {
        return res.status(500).json({ error: 'unable to verify user' });
      });
  },
  signin: function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (email == null || password == null) {
      return res.status(400).json({ error: 'missing parameters' });
    }

    models.User.findOne({
      where: { email: email },
    })
      .then(function (userFound) {
        if (userFound) {
          bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
            if (resBycrypt) {
              return res.status(200).json({
                user: {
                  email: userFound.email,
                  first_name: userFound.first_name,
                  last_name: userFound.last_name,
                  role: userFound.role,
                },
                token: jwtUtils.generateTokenForUser(userFound),
              });
            } else {
              return res.status(403).json({ error: 'invalid password' });
            }
          });
        } else {
          return res.status(400).json({ error: 'user not exist in DB airbnb_api' });
        }
      })
      .catch(function (err) {
        return res.status(500).json({ error: 'unable to verify user' });
      });
  },
};
