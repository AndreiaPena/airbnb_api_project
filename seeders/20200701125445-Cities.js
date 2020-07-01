'use strict';


const villes = require('../seeds/Cities')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Cities", villes );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};
