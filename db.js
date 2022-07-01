const mongoose = require('mongoose')

require('dotenv').config()
username = process.env.DB_USERNAME
password = process.env.DB_PASSWORD
dataBaseName = process.env.DB_NAME

const mongoURI = `mongodb+srv://${username}:${password}@cluster0.33e4r.mongodb.net/${dataBaseName}`


// Connecting the database 
const connectToMongoDb = () => {
    mongoose.connect(mongoURI, ()=> {
        console.log("Connected to Mongo")
    })
}

module.exports = connectToMongoDb