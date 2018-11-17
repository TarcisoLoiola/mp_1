const Joi = require('joi')

module.exports = {
    validateBody: (schema) => {
        return(req, res, next) => {
            const result = Joi.validate(req.body, schema)
            if(result.error) {
                // const field = result.error.details[0].context.key
                // result.error.details[0].message = `${field.toUpperCase()} FIELD IS REQUIRED!`
                return res.status(400).json(result.error)
            }

            if(!req.value) {
                req.value = {}
            }

            req.value['body'] = result.value
            next()
        }
    },

    schemas: {
        authSchema: Joi.object().keys({
            username: Joi.string().required(),
            email: Joi.string().email().lowercase().required(),
            password: Joi.string().required(),
            phone: Joi.string().required(),
            token: Joi.string()
        })
    }
}