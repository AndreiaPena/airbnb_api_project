'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      this.belongsTo(models.Place, {
        foreignKey: 'idPLACES',
      });
      this.belongsTo(models.User, {
        foreignKey: 'idUSERS',
      });
    }
  };
  Booking.init({
    idUSERS: DataTypes.INTEGER,
    idPLACES: DataTypes.INTEGER,
    check_in: DataTypes.DATE,
    check_out: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'booking',
  });
  return Booking;
};