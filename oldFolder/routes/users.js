const express = require('express');
const router = express.Router();
const db = require('../models');
// const passport = require("passport");

/* GET users listing. */
router.get('/users', (req, res, next) => {
  db.users
    .findAll({})
    .then(data => res.json(data))
    .catch(error => res.json(error))
});

router.get('/user/:id', (req, res, next) => {
  const id = req.params.id;
  db.users
    .findOne({
      where: {
        id
      }
    })
    .then(data => res.json(data))
    .catch(error => res.json(error))
});

router.get('/email/:email', (req, res, next) => {
  const email = req.params.email;
  db.users
    .findOne({
      where: {
        email
      }
    })
    .then(data => res.json(data))
    .catch(error => res.json(error))
});
  
module.exports = router;