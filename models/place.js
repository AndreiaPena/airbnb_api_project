'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {

    static associate(models) {
      this.belongsTo(models.City, {
        foreignKey: 'idCITIES',
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Place.init(
    {
      idCITIES: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      rooms: DataTypes.INTEGER,
      bathrooms: DataTypes.INTEGER,
      max_guests: DataTypes.INTEGER,
      price_by_night: DataTypes.INTEGER,
      pictures: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Place',
    }
  );
  return Place;
};
