const express = require('express')
const router = require('express-promise-router')();

const { validateBody, schemas } = require('../helpers/routeHelpers')
const UsersController = require('../controllers/usersController')

router.route('/signup')
.post(validateBody(schemas.authSchema), UsersController.signUp)
// .then(res => console.log(res))
// .catch(err => console.log(err))

router.route('/signin')
.post(UsersController.signIn)

router.route('/secret')
.get(UsersController.secret)

router.route('/all')
.get(UsersController.all)

router.route('/delete/:id')
.get(UsersController.delete)

router.route('/delete/all/users')
.get(UsersController.deleteAll)

module.exports = router
