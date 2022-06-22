const mongoose = require('mongoose')

const mongoURI = "mongodb://localhost:27017/inotebook"

// Connecting the database 
const connectToMongoDb = () => {
    mongoose.connect(mongoURI, ()=> {
        console.log("Connected to Mongo")
    })
}

module.exports = connectToMongoDb