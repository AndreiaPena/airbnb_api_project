const bcrypt = require('bcrypt');
const models = require('../models');

const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;

module.exports = {
    signup : function(req, res){

        const email = req.body.email;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const password = req.body.password;
        const role = req.body.role;
        console.log("email " + req.body.email)
        console.log("role " + req.body.role)
        console.log("password " + req.body.password)
        console.log("fn " + req.body.first_name)
        console.log("ln " + req.body.last_name)

        if( email == null || password == null || first_name == null || last_name == null ){
            return res.status(400).json({ "error" : " missing parameters"})
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 'error': 'email is not valid' });
          }

       

models.User.findOne({
    attributes : ['email'],
    where: { email : email }
})
.then(function(userFound){
    if(!userFound){
        bcrypt.hash(password, 5, function(err, bcryptedPassword){
            const newUser = models.User.create({
               email : email,
               first_name : first_name,
               last_name : last_name,
               password : bcryptedPassword,
               role : role 
            })
        })
    .then(function(newUser){
        return res.status(200).json({
            'userId' : newUser.id
        })
    })
    .catch(function(err){
        return res.status(500).json({ 'error' : 'cannot add user'})
    })
    } else {
        return res.status(409).json({ 'error' : 'user already exist'})
    }
})
.catch(function(err){
    return res.status(500).json({ 'error' : 'unable to verify user'})
})



    }
}