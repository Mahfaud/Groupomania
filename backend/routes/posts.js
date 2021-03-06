const router = require("express").Router();
const postsControllers = require("../controllers/posts")
const {upload} = require("../middleware/uploads")
const authorize = require("../middleware/authorize")


// Route POST pour la création d'un poste
router.post("/forum",authorize,  upload.single("file") ,postsControllers.createPost)

// Route GET pour l'affichage de tous les posts'
router.get("/forum", authorize, postsControllers.getAllPosts)

// Route DELETE pour supprimer un post
router.delete("/forum/post/:userid/:id",authorize, postsControllers.deleteOnePost)

// Route GET pour afficher un post
router.get("/forum/post/:userid/:id", authorize,  postsControllers.getOnePost)

module.exports = router;