const models = require('../models');

module.exports = {
  addCity: function (request, response) {
    const data = require('../seeds/Cities')()[13];
    const newCity = models.City.create(data);
    response.json(data);
  },
  viewCity : function (request, response) {
    
  }
};
