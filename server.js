const express = require('express');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const restrictedRoutes = require('./data/restrictedRoutes');
const userRoutes = require('./data/userRoutes');
const { validateUser } = require('./data/middlewares');
const middlewareConfig = require('./middlewareConfig');
const knexConnection = require('./data/dbConfig');

const server = express();
const sessionConfiguration = {
  name: 'lumos',
  secret: process.env.COOKIE_SECRET || 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: process.env.NODE_ENV === 'development' ? false : true,
    httpOnly: true, 
    
  },
  resave: false,
  saveUninitialized: true, // Only in case of development
  store: new KnexSessionStore({
    knex: knexConnection,
    clearInterval: 1000 * 60 * 10, // delete expired sessions every 10 minutes
    tablename: 'user_sessions',
    sidfieldname: 'id',
    createtable: true
  })
  // If store is not defined then session is not stored in db. It is only stored in memory so the session is not persisted if the server restarts.
};

middlewareConfig(server);
server.use(session(sessionConfiguration));

server.get('/', (req, res) => {
  res.status(200).send('Testing');
});

server.use('/', userRoutes);

server.use(validateUser);
server.use('/restricted', restrictedRoutes);

module.exports = server;