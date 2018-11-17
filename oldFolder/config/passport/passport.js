const bCrypt = require("bcrypt-nodejs")
const moment = require('moment')
// const db = require("models/users.js")

module.exports = (passport, user) => {
    let userInfo
    const User = user

    const LocalStrategy = require("passport-local").Strategy

    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if(user) {
                done(null, user.get())
            } else {
                done(user.errors, null)
            }
        })
    })
//USER REGISTER
    passport.use("user-register", new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
        function (req, email, _password, done) {
            console.log(req.body.token)
            const generateHash = function (_password) {
                return bCrypt.hashSync(_password, bCrypt.genSaltSync(8), null)
            }

            User.findOne( {where: { email: email }}).then( function (dbContent) {
                
                if(dbContent) {
                    return done(null, 409, { Message: "This email is associated with an existing account."})
                } else {
                    const password = generateHash(_password)
                    const data = {
                        name: req.body.name,
                        email: email,
                        phone: req.body.phone,
                        password: password,
                        token: (moment()+password)
                        }
                    User.create(data).then(function (newUser, created) {
                        
                        if (!newUser) {
                            // res.json(newUser)
                            return done(null, newUser, created)
                        }
                        if (newUser) {
                            return done(null, newUser, created)
                        }
                    })
                }
            })
        }
    ))
//USER LOGIN
    passport.use("user-login", new LocalStrategy(
        {
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function (req, email, password, done) {

            const User = user
            const isValidPassword = function (pass, password){
                return bCrypt.compareSync(password, pass)
            }
            
            User.findOne({ where: { email: email}})
            
            .then(function (dbContent) {

                if (!dbContent) {
                    return done(null, 404, { message: 'Email does not exist' })
                }
                if (!isValidPassword(dbContent.password, password)) {
                    return done(null, 206, { message: 'Incorrect password.' })
                }

                userInfo = dbContent.get()
                return done(null, 200, userInfo)

            }).catch(function (err) {
                // console.log(err)
                return done(null, 404, { message: "There was an issue with your signin"})
            })
        }
    ))
}


