const router = require("express").Router();
const authorize = require("../middleware/authorize")


// Route GET pour la  vérification de connexion
router.get("/isLoggedIn", authorize ,(req, res) => {
    res.send(req.user)
});


module.exports = router;