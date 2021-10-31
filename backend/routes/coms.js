const router = require("express").Router();
const comsControllers = require("../controllers/coms")
const authorize = require("../middleware/authorize")


// Route POST pour créer un commentaire à un post
router.post("/forum/post/:id", authorize,  comsControllers.createComs)

// Route GET pour afficher les commentaires d'un post
router.get("/forum/post/:id/coms", authorize, comsControllers.getAllComs)

// Route DELETE pour supprimer un commentaire
router.delete("/forum/post/:id/coms", authorize, comsControllers.deleteOneCom)



module.exports = router;