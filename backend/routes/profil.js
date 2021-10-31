const router = require("express").Router();
const profilControllers = require("../controllers/profil")
const authorize = require("../middleware/authorize")


// Route GET pour envoyer les informations du profil
router.get("/profil/:id", authorize, profilControllers.getProfil)

// Route PUT pour la modification d'un compte
router.put("/profil/:id",authorize, profilControllers.updateProfil)

// Route PUT pour la modification d'un compte
router.delete("/profil/:id", authorize, profilControllers.deleteProfil)


module.exports = router;