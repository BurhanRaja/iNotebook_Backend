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
        body("title").isLength({ min: 3 }),
        body("description", "Add more detail to your description.").isLength({ min: 5 })
    ], fecthuser, async (req, res) => {
        try {
            // Checking for any errors, if any Display.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Destructuring the req.body
            const { title, description, tags } = req.body;

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



// ROUTE 3: Update notes of the user from UPDATE request 'api/notes/addnote'
router.put("/updatenote/:id", fecthuser, async (req, res) => {

    try {
        const { title, description, tags } = req.body
    
        // Creaitng new Note and replacing the given parameter with the old one
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tags) { newNote.tags = tags }
    
        // To check whether the note exists or not 
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not Found")
        }
    
        // To check whether user is genuine or not
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized Access")
        }
    
        // Updating using id
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.send(note)
    } 
    
    catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal Server Error." })
    }

})



// ROUTE 4: Delete existing note of the user from Delete request 'api/notes/addnote'
router.delete("/deletenote/:id", fecthuser, async (req, res) => {
    try {
        // To check whether the note exists or not 
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not Found")
        }

        // To check whether user is genuine or not
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized Access")
        }

        // Deleting using id
        note = await Note.findByIdAndDelete(req.params.id, { $set: null })
        res.send({"Sucess": "Note has been deleted"})
    } 
    
    catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal Server Error." })
    }
})


module.exports = router