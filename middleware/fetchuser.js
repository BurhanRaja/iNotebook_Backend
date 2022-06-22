const jwt = require('jsonwebtoken')

// Fetching the user using the id
const fecthuser = (req, res, next) => {
    const token = req.header('authentication-token')

    if (!token) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }

    require('dotenv').config()
    let privateKey = process.env.JWT_SECRET_KEY

    // Verifying the token by comparing id
    const data = jwt.verify(token, privateKey)
    console.log(data)
    console.log(data.user)
    req.user = data.user
    next()
}

module.exports = fecthuser