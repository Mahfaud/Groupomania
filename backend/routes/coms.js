const router = require("express").Router();
const comsControllers = require("../controllers/coms")
const authorize = require("../middleware/authorize")


// Route POST pour créer un commentaire à un post
router.post("/forum/post/:userid/:id", authorize,  comsControllers.createComs)

// Route GET pour afficher les commentaires d'un post
router.get("/forum/post/:userid/:id/coms", authorize, comsControllers.getAllComs)


module.exports = router;