const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
  res.status(200).send('Testing');
});

module.exports = server;