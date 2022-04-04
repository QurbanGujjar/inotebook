const express = require('express')
const router = express.Router()



// router.get('/', )
router.get('/', (req, res) => {


    obj = {
        name: "Notes",
        Number: 34
    }
    res.json(obj)
})

module.exports = router