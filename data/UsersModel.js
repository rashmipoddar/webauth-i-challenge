const db = require('./dbConfig');

const find = () => {
  return db('users');
};

const findById = (userId) => {
  return db('users').where({userId}).first();
};

const findBy = (username) => {
  return db('users').where({username}).first();
}

const add = (user) => {
  return db('users').insert(user)
    .then(ids => {
      return findById(ids[0]) 
    })
};



module.exports = {
  find,
  findBy,
  findById,
  add
}