const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fecthuser = require('../middleware/fetchuser')

const router = express.Router()



// ROUTE-1 :-  Create a user from POST request "api/auth" in routes
// Full path :- "api/auth/createuser"
router.post('/createuser',
    [
        // Validating if the given user input is as per requirements or not
        body('name', "Please enter at least 3 characters in name.").isLength({ min: 3 }),
        body('email', "Please enter a valid email.").isEmail(),
        body('password', "Please enter at least 5 characters in password.").isLength({ min: 5 })
    ],
    async (req, res) => {
        // Success
        let success = false

        // Checking for any errors, if any Display.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Checking if a user already exists or not, if yes then throw the below error.
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ errors: "User with this email already exists." })
            }

            // Secure Password
            const salt = await bcrypt.genSalt(10)
            let securePassword = await bcrypt.hash(req.body.password, salt)

            // Waiting for the promises to resolve and creating new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword,
            })

            // JWT Web Tokens handled here
            require('dotenv').config()
            let privateKey = process.env.JWT_SECRET_KEY // Secret Key

            // Data to send
            const data = {
                user: {
                    id: user.id
                }
            }
            // Sending Authentication token to client
            let authToken = jwt.sign(data, privateKey)
            success = true
            res.json({success, authToken})
        }

        catch (error) {
            console.error(error.message)
            res.status(500).send({ error: "Internal Server Error." })
        }
    })




// ROUTE-2 :-  Authenticate (login) the user from POST request "api/auth" in routes
// Full path :- "api/auth/login"
router.post('/login', 
    [
        body('email', "Please enter a valid email.").isEmail(),
        body('password', "Password cannot be blank").exists()
    ], async (req, res) => {
        // Success
        let success = false

        // Checking for any errors, if any Display.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        try {
            // Getting the data from req
            const {email, password} = req.body
            // Finding user with the given email
            let user = await User.findOne({email})

            // Check if email exists
            if (!user) {
                return res.status(400).json({error: "Invalid email or password."})
            }

            // Check if password exists
            const passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) {
                return res.status(400).json({error: "Invalid email or password."})
            }

            // JWT Web Tokens handled here
            require('dotenv').config()
            let privateKey = process.env.JWT_SECRET_KEY // Secret Key

            // Data to send
            const data = {
                user: {
                    id: user.id
                }
            }
            // Sending Authentication token to client
            let authToken = jwt.sign(data, privateKey)
            success = true
            res.json({success, authToken})
        } 
        
        catch (error) {
            console.error(error.message)
            res.status(500).send({ error: "Internal Server Error." })
        }
})


// ROUTE-3 :-  Get logedin User details from GET request "api/auth" in routes
// Full path :- "api/auth/getuser"

router.get('/getuser', fecthuser, async (req, res) => {

    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal Server Error." })
    }
})

module.exports = router