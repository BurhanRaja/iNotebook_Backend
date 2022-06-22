const connectToMongoDb = require('./db')
const express = require('express')

connectToMongoDb()

const app = express()
const port = 5000

app.use(express.json())

// Homepage Route
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Available Routes from routes
app.use('/api/auth', require("./routes/auth")) // Authentication
app.use('/api/notes', require("./routes/notes")) // Notes


app.listen(port, () => {
    console.log(`Example app listening on port https://localhost:${port}`)
})