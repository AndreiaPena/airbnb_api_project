'use strict';

const villes = require('../seeds/Places')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Places", villes("Places"), {} );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Places', null, {});
  }
};
