const mongoose = require('mongoose')
const { Schema } = mongoose

// Update Schemas for Notes database here
const NoteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },

    tags: {
        type: String,
    },

    date : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('note', NoteSchema)