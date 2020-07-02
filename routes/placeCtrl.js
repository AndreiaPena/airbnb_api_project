const models = require('../models');
const jwtUtils = require ('../utils/jwt.utils');

module.exports = {
    addPlace : function(req, res){

        const idCITIES = req.body.idCITIES;
        const name = req.body.name;
        const description = req.body.description;
        const rooms = req.body.rooms;
        const bathrooms = req.body.bathrooms;
        const price_by_night = req.body.price_by_night;
        const max_guests = req.body.max_guests;

        models.Place.findAll({
            where:{id:idCITIES}, 
            include:[
                { model:City,
                  where:{ 
                        id:1},   
                  required:false
                  }
                ]
             })
                const newUser = models.Place.create({
                     idCITIES : idCITIES,
                     name : name,
                     description : description,
                     rooms : rooms,
                     bathrooms : bathrooms,
                     price_by_night : price_by_night,
                     max_guests : max_guests
                
                })
    }
};
