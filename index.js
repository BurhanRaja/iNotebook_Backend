const connectToMongoDb = require('./db')
const express = require('express')
const cors = require('cors')
connectToMongoDb()

const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use(cors())
app.use(express.json())

// Available Routes from routes
app.use('/api/auth', require("./routes/auth")) // Authentication
app.use('/api/notes', require("./routes/notes")) // Notes


app.listen(port, () => {
    console.log(`iNotebook app listening on port https://localhost:${port}`)
})

module.exports = app