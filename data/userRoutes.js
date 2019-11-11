const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('./UsersModel');
const { validateUserData, validateUser} = require('./middlewares');

router.post('/register', validateUserData, (req, res) => {
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

router.post('/login', validateUserData,  (req, res) => {
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

router.get('/users', validateUser, (req, res) => {
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

module.exports = router;

