const express = require('express')
const app = express()
const cors = require('cors')
const mongoConnection = require('./config/mongo.config')
require('dotenv').config()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.listen(mongoConnection)
app.listen(PORT, () =>{
    console.log(`Server is running at port: ${PORT}`)
})