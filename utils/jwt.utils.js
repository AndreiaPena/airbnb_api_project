const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'sdlfhdslkfhdslfh820289fdsf0982298sdlfkjf0019'
module.exports = {
    generateTokenForUser: function(userData){
        return jwt.sign({
            userId : userData.id
        },
        JWT_SIGN_SECRET,
        {
            expiresIn : '1h'
        })
    }
}