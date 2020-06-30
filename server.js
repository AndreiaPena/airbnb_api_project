const express = require('express');

const server = express();

server.get("/", function (request,response){
    response.json({ message : 'hello ! '})
});

server.listen(8060, function(){
    console.log('Serveur demarré')
})