const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send('Restricted Route');
})

module.exports = router;