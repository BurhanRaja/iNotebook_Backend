const connectToMongoDb = require('./db')
const express = require('express')
const cors = require('cors')

connectToMongoDb()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available Routes from routes
app.use('/api/auth', require("./routes/auth")) // Authentication
app.use('/api/notes', require("./routes/notes")) // Notes


app.listen(port, () => {
    console.log(`iNotebook app listening on port https://localhost:${port}`)
})

module.exports = app