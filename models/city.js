'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    
  
    static associate(models) {
      this.belongsTo(models.Place, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  City.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};