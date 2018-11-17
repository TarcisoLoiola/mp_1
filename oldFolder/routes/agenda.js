const express = require('express')
const router = express.Router()
const db = require('../models')
// const passport = require("passport")

/* GET agenda listing. */
router.get('/agenda', (req, res, next) => {
  db.agenda
    .findAll({})
    .then(data => res.json(data))
    .catch(error => res.json(error))
})

module.exports = router
