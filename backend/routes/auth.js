const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_secret = "qurbanisagoodb$oy";
//  Route-1: Create a user using:Post 'api/auth/createuser' does not required auth
router.post(
    "/createuser", [
        body("name", "enter a valid name").isLength({ min: 3 }),
        body("email", "enter a valid email").isEmail(),
        body("password", "Password must be five Character").isLength({ min: 5 }),
    ],
    async(req, res) => {
        // if there is an error return bad request and error message
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // check wether the user with this email exits already
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res
                    .status(400)
                    .json({ error: "Sorry s user with this email already exits" });
            }
            // change  password to hash by using salt
            const salt = await bcrypt.genSaltSync(10);
            const secPass = await bcrypt.hashSync(req.body.password, salt);
            // create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });
            // return token to the user
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authtoken = jwt.sign(data, JWT_secret);
            res.json({ authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error ");
        }
    }
);
//Route - 2: Authenticate a user using:Post 'api/auth/login' does not required auth
router.post(
    "/login", [
        body("email", "enter a valid email").isEmail(),
        body("password", "Password cannot be blank").exists(),
    ],
    async(req, res) => {
        // if there is an error return bad request and error message
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // destructure email and password from the body
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ error: "Please try to login with correct credentials" });
            }
            // compare password user paswword
            const passwordCompare = await bcrypt.compare(password, user.password);

            if (!passwordCompare) {
                return res
                    .status(400)
                    .json({ error: "Please try to login with correct credentials" });
            }

            // return token to the user
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authtoken = jwt.sign(data, JWT_secret);
            // sending token
            res.json({ authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error ");
        }
    }
);


//Route - 3: GetLoggedin a user using:Post 'api/auth/getuser' login required


router.post("/getuser", fetchuser, async(req, res) => {


    try {

        userID = req.user.id
        const user = await User.findById(userID).select("-password")
        res.send(user)


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ");
    }
})

module.exports = router;