const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(400).send({message: "Vous n'avez pas accès à ces données"})
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(400).send({message: "Vous n'avez pas accès à ces données"})
        }
        if (req.params.id === String(user.user_id) || user.role === "moderator") {
            user.access = true
            req.user = user
            next()
        } else {
            req.user = user
            next()
        }
    });
}

