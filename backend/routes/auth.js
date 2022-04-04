const express = require('express')
const User = require('../models/User')
const router = express.Router()


// Create a user using:Post 'api/auth' does not required auth
router.post('/', (req, res) => {
    res.send(req.body)


    const user = User(req.body)
    user.save()
    console.log(req.body)
})

module.exports = router