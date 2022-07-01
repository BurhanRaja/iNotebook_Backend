const mongoose = require('mongoose')

require('dotenv').config()
const mongoURI = process.env.MONGODB_URI


// Connecting the database 
const connectToMongoDb = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo")
    }, (err) => {
        if (err) return console.log("Error: ", err);
        console.log(
            "MongoDB Connection -- Ready state is:",
            mongoose.connection.readyState)
        })
}

module.exports = connectToMongoDb