const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require("./models")

const app = express()

//Midleware
app.use(morgan('dev'))
app.use(bodyParser.json())
//Routes
app.use('/', require('./routes/usersRoute'))
//Server

const localPort = 3001
const port = process.env.Port || localPort

app.listen(port, () => {
    console.log(`Listening to Port: ${port}`)
})