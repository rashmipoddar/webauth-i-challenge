const express = require('express');

const restrictedRoutes = require('./data/restrictedRoutes');
const userRoutes = require('./data/userRoutes');
const { validateUser } = require('./data/middlewares');
const middlewareConfig = require('./middlewareConfig');

const server = express();

middlewareConfig(server);

server.get('/', (req, res) => {
  res.status(200).send('Testing');
});

server.use('/', userRoutes);

server.use(validateUser);
server.use('/restricted', restrictedRoutes);

module.exports = server;