const express = require('express');
require('express-async-errors');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;
const helmet = require('helmet');
const logger = require('morgan');
const { notFoundHandler, errorLogger, errorHandler } = require('./middlewares');

const server = express();

//Helmet
server.use(helmet());

//Morgan
server.use(logger('tiny'));

//Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//CORS
server.use(cors());

//configure routes
server.get('/', function (request, response) {
  response.json({ message: 'hello ! ' });
});

server.use('/api', apiRouter);

server.use('*', notFoundHandler);
server.use(errorLogger);
server.use(errorHandler);

server.listen(8060, function () {
  console.log('Serveur demarré');
});
