const mongoose = require('mongoose')

const NoteSchema = new Schema({
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

module.exports = mongoose.model('notes', NoteSchema)