const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');


router.post('/', 
[    
    body('name', "Please enter at least 3 characters.").isLength({min:3}),    
    body('email').isEmail(),    
    body('password', "Please enter at least 5 characters.").isLength({min:5})
], 
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }).then(user => res.json(user))
        .catch(err => {
        res.json({error: "User with this email already exists. Please enter a unique value of email.", message: err.message})})
})

module.exports = router