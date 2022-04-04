const connectToMongo = require("./db");
connectToMongo();

const express = require('express')
const app = express()
const port = 5000
    // if you want to use req.body then you should use middlewara "" app.use(express.json())""
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})