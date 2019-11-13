// const bcrypt = require('bcryptjs');

// const User = require('./UsersModel');

const validateUserData = (req, res, next) => {
  // console.log(req.body);
  if (!req.body.username || !req.body.password) {
    res.status(400).send('Username and password are required.');
  } else {
    next();
  }
}

const validateUser = (req, res, next) => {
  // console.log(req.session);
  if (req.session && req.session.username)  {
    next();
  } else {
    res.status(401).send({message: 'You shall not pass.'});
  }

  // const userInfo = req.headers || req.body;
  // if (!userInfo.username || !userInfo.password) {
  //   res.status(400).send({message: 'Username and password required.'});
  // } else {
  //   User.findBy(userInfo.username)
  //   .then(user => {
  //     // console.log(user);
  //     if(user && bcrypt.compareSync(userInfo.password, user.password)) {
  //       next();
  //     } else {
  //       res.status(401).send({message: 'You shall not pass.'});
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).send({message: 'There was a db error. Try again.'});
  //   })
  // }

};

module.exports = {
  validateUserData,
  validateUser
}