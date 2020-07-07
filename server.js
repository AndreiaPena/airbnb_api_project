const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;
const server = express();

//Body Parser configuration
server.use(bodyParser.urlencoded({extended : true}));
server.use(bodyParser.json());

server.use(cors());

//configure routes
server.get("/", function (request,response){
    response.json({ message : 'hello ! '})
});

server.use('/api', apiRouter);

server.listen(8060, function(){
    console.log('Serveur demarré')
})
