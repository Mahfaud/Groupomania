const router = require("express").Router();
const profilControllers = require("../controllers/profil")


// Route GET pour envoyer les informations du profil
router.get("/profil/:id", profilControllers.getProfil)

// Route PUT pour la modification d'un compte
router.put("/profil/:id", profilControllers.updateProfil)

// Route PUT pour la modification d'un compte
router.delete("/profil/:id", profilControllers.deleteProfil)


module.exports = router;