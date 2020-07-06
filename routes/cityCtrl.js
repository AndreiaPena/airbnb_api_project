const models = require('../models');

module.exports = {
  addCity: function (req, res) {
    const data = require('../seeds/Cities')()[13];
    const newCity = models.City.create(data);
    res.json(data);
  },
  viewCity : function (req, res) {
    
  }
};
