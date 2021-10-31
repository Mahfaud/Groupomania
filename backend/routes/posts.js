const router = require("express").Router();
const postsControllers = require("../controllers/posts")
const {upload} = require("../middleware/uploads")
const authorize = require("../middleware/authorize")


// Route POST pour la création d'un poste
router.post("/forum",authorize,  upload.single("file") ,postsControllers.createPost)

// Route GET pour l'affichage de tous les posts'
router.get("/forum", authorize, postsControllers.getAllPosts)

// Route DELETE pour supprimer un post
router.delete("/forum/post/:id",authorize, postsControllers.deleteOnePost)

// Route GET pour afficher un post
router.get("/forum/post/:id",authorize, postsControllers.getOnePost)

// Route POST pour créer un commentaire à un post
router.post("/forum/post/:id", authorize,  postsControllers.createComs)

// Route GET pour afficher mes posts
router.get("/forum/posts/:id", authorize, postsControllers.getMyPosts)

// Route GET pour afficher les commentaires d'un post
router.get("/forum/post/:id/coms", authorize, postsControllers.getAllComs)

// Route DELETE pour supprimer un commentaire
router.delete("/forum/post/:id/coms", authorize, postsControllers.deleteOneCom)

module.exports = router;