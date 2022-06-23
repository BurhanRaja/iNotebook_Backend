const express = require('express')
const Note = require('../models/Note')
const fecthuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')

const router = express.Router()

// ROUTE 1: Getting all the Notes of the user from GET request 'api/notes/fetchallnotes'
router.get('/fetchallnotes', fecthuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.send(notes)
    } 
    
    catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal Server Error." })
    }
})

// ROUTE 2: Creating notes of the user from POST request 'api/notes/addnote'
router.post('/addnote', 
[
    body("title").isLength({min : 3}),
    body("description", "Add more detail to your description.").isLength({min:5})
], fecthuser, async (req, res) => {
    try {
        // Checking for any errors, if any Display.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Destructuring the req.body
        const {title, description, tags} = req.body;
        
        // Creating new Note and saving it
        const notes = new Note({
            title: title,
            description: description,
            tags: tags,
            user: req.user.id
        })
        const saveNotes = await notes.save()
        res.send(saveNotes)
    } 
    
    catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal Server Error." })
    }
})

module.exports = router