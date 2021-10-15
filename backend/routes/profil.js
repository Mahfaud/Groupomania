const router = require("express").Router();
const profilControllers = require("../controllers/profil")


// Eoute GET pour envoyer les informations du profil
router.get("/profil", profilControllers.getProfil)

// Route PUT pour la modification d'un compte
router.put("/profil", profilControllers.updateProfil)

// Route PUT pour la modification d'un compte
router.delete("/profil", profilControllers.deleteProfil)


module.exports = router;