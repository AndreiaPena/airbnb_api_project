'use strict';

const villes = require('../seeds/Cities')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Cities", villes("Cities"), {} );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};
