const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const mongoose = require('mongoose')

dotenv.config({
    path: './config.env'
})

mongoose.connect(process.env.DB_URI_LOCAL, {
        useNewUrlParser: true
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => console.log(err));

const app = express()

//Middlerwares
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors())



//routes
app.use('/api/v1',require('./routes/user'))




const PORT = 3000 || process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})