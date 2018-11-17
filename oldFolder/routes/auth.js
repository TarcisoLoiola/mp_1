
module.exports = (app, passport) => {

    app.post("/user/login", passport.authenticate("user-login", (err, res, message) => {
        try {
        //     console.log(err, res, message)
            res.json(err, res, message)
        } catch (error) {
            // console.log(err, res, message)
            res.json(err, res, message)
        }
    }
    ));

    app.post("/user/register", passport.authenticate("user-register", (err, res, message) => {
        try {
            console.log(err, res, message)
            res.json(err, res, message)
        } catch(error) {
            console.log(err, res, message)
            res.json(err, res, message)
        }
    }
    ));

};///istuarte/stylist/new

