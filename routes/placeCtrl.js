const models = require('../models');

module.exports = {
    addPlace : function(req, res){

        const idCITIES = req.body.email;
        const name = req.body.name;
        const description = req.body.description;
        const rooms = req.body.rooms;
        const bathrooms = req.body.bathrooms;
        const price_by_night = req.body.price_by_night;
        const max_guests = req.body.max_guests;
    }
};
