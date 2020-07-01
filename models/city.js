'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    
    // VOIR SI LASSOCIATION EST CORRECTE
    // static associate(models) {
    //   this.belongsTo(models.Place, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   })
    // }
  };
  City.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};