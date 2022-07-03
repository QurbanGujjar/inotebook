const connectToMongo = require("./db");

const express = require('express')
const fileUpload = require('express-fileupload')
var cors = require('cors')
connectToMongo();
const app = express()
const port = 5000
app.use(cors())
app.use(fileUpload());



// if you want to use req.body then you should use middlewara "" app.use(express.json())""
app.use(express.json())
app.use(express.static('public'))

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})