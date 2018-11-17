var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET index listing. */
router.get('/user/:id', (req, res, next) => {
  const id = req.params.id;
  db.users
    .findOne({
      where: {
        id: id
      }
    }
  )
    .then(data => {
      res.json(data);
    })
});

router.get('/users', (req, res, next) => {
  console.log("USERS")
  db.users.findAll({})
    .then(data => {
      res.json(data);
    })
});


module.exports = router;
