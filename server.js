const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const User = require('./data/UsersModel');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


const validateUserData = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    console.log('inside validateUserData');
    res.status(400).send('Username and password are required.');
  } else {
    next();
  }
}

server.get('/', (req, res) => {
  res.status(200).send('Testing');
});

server.post('/register', validateUserData, (req, res) => {
  const user = req.body;
  const hashedPassword = bcrypt.hashSync(user.password, 12);
  user.password = hashedPassword;
  
  User.add(user)
    .then(userData => {
      // console.log(userData);
      res.status(201).send(userData);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'The user could not be registered'});
    })

});

server.post('/login', validateUserData,  (req, res) => {
  const userInfo = req.body;

  User.findBy(userInfo.username)
    .then(user => {
      // console.log(user);
      if(user && bcrypt.compareSync(userInfo.password, user.password)) {
        res.status(200).send('Logged in');
      } else {
        res.status(401).send({message: 'Invalid user credentials'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({message: 'There was a db error. Try again.'});
    })
});

server.get('/users', validateUser, (req, res) => {
  User.find()
    .then(users => {
      // console.log(users);
      res.status(200).send(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({message: 'There was an error in getting users from the db. Try again.'});
    })
});

function validateUser(req, res, next) {
  const userInfo = req.headers;
  if (!userInfo.username || !userInfo.password) {
    res.status(400).send({message: 'Username and password required.'});
  } else {
    User.findBy(userInfo.username)
    .then(user => {
      // console.log(user);
      if(user && bcrypt.compareSync(userInfo.password, user.password)) {
        next();
      } else {
        res.status(401).send({message: 'You shall not pass.'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({message: 'There was a db error. Try again.'});
    })
  }
};

module.exports = server;