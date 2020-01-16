const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
require('dotenv').config()

const app = express()

mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0-ed5yd.mongodb.net/'+process.env.DB_NAME+'?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true
})

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(process.env.APP_PORT)






