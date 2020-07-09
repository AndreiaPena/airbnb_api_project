'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
       placeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model : "Places",
          key : "id"
        }
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model : "Users",
          key : "id"
        }
      },
      check_in: {
        allowNull: false,
        type: Sequelize.DATE
      },
      check_out: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  }
};