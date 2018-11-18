const JWT = require('jsonwebtoken')
const moment = require('moment')
const db = require('../models');

signToken = (id) => {
    return JWT.sign({
        iss: 'CodeWorkr',
        sub: id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, 'newUserAuth')
}

module.exports = {
    signUp: async(req, res, next) => {
        const {username, email, password, phone} = req.value.body

        const existingUser = await db.users.findOne({ where: { email } })
        
        if(existingUser) return res.status(403).json({
                code: 403,
                response: 'This user already exist.'
            })

        const newUser = {username, email, password, phone}
        

        db.users
        .create(newUser)
            .then( (newUser, created) => {
                const { id } = newUser.dataValues
                const token = signToken(id)
                res.status(200).json({
                    data: newUser,
                    token,
                    code: 200,
                    response: 'User created'
                })
            })
            .catch(error => res.json(error))
    },

    signIn: async(req, res, next) => {
        const { email, password } = req.value.body
    },

    secret: async(req, res, next) => {
        console.log('secret Called')
    },

    all: async(req, res, next) => {
        db.users
            .findAll({})
            .then(data => res.json(data))
            .catch(error => res.json(error))
    },
    
    delete: async(req, res, next) => {
        const { id } = req.params
        console.log(id)
        db.users
            .destroy({
                where: {
                    id
                }
            })
            .then(response => res.json(response))
            .catch(err => res.json(err))
    },
    
    deleteAll: async(req, res, next) => {
        
        db.users
            .findAll({})
            .then(data => {
                data.map( user => {
                    const { id } = user.dataValues
                    if( !id == 4 ){
                        db.users
                            .destroy({
                                where: {
                                    id
                                }
                            })
                    }
                })
            })
            .catch(error => res.json(error))
    }
}