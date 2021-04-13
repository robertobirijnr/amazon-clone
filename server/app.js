const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()


//routes
app.get('/',(req,res)=>{
    res.send('hello amazon')
})


//Middlerwares
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const PORT = 3000 || process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})