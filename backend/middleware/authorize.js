const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log(authHeader)
    if (!authHeader) {
        return res.status(400).send("Vous n'avez pas accès à ces données")
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(400).send("Vous n'avez pas accès à ces données !")
        }
        req.user = user
        next()
    });
}

