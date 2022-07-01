const mongoose = require('mongoose')

require('dotenv').config()
const mongoURI = process.env.MONGODB_URI


// Connecting the database 
const connectToMongoDb = () => {
    mongoose.connect(mongoURI, ()=> {
        console.log("Connected to Mongo")
    })
}

module.exports = connectToMongoDb