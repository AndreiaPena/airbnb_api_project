'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Places', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idCITIES: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model : "Cities",
          key : "id"
        }
      },
      // idUSERS: {
      //   allowNull: false,
      //   type: Sequelize.INTEGER,
      //   references : {
      //     model : "Users",
      //     key : "id"
      //   }
      // },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rooms: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      bathrooms: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      max_guests: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      price_by_night: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Places');
  }
};