'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      this.belongsTo(models.Place, {
        foreignKey: 'placeId',
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Booking.init(
    {
      userId: DataTypes.INTEGER,
      placeId: DataTypes.INTEGER,
      check_in: DataTypes.DATE,
      check_out: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'booking',
    }
  );
  return Booking;
};
