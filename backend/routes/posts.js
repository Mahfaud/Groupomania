const router = require("express").Router();
const postsControllers = require("../controllers/posts")
const {upload} = require("../middleware/uploads")


// Route POST pour la création d'un poste
router.post("/forum", upload.single("file") ,postsControllers.createPost)

// Route GET pour l'affichage de tous les posts'
router.get("/forum",postsControllers.getAllPosts)



module.exports = router;