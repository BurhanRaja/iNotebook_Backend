const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()

// POST request from the "api/auth" in routes
// Full path :- "api/auth/createuser"
router.post('/createuser',
    [
        // Validating if the given user input is as per requirements or not
        body('name', "Please enter at least 3 characters.").isLength({ min: 3 }),
        body('email').isEmail(),
        body('password', "Please enter at least 5 characters.").isLength({ min: 5 })
    ],
    async (req, res) => {
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
            res.json({authToken})
        }

        catch (error) {
            console.error(error.message)
            res.status(500).json({ error: "Internal Server Error." })
        }
    })

module.exports = router