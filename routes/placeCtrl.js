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

        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);

        if (userId < 0)
            return res.status(400).json({ 'error': 'wrong token' });

        models.User.findOne({
            attributes: [ 'id', 'role' ],
            where: { id: userId }
        }).then(function(user) {
            if( role ='tourist'){
                res.status(400).json({ 'error' : "vous n'avez pas l'autorisation d'accéder à cette page"
                })
            }
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(404).json({ 'error': 'user not found' });
        }
        }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot fetch user' });
        });
    }
};
