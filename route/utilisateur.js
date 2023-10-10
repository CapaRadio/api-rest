const express = require ('express');
const router = express.Router();
const { 
    ajouterUtilisateur, 
    getTousUtilisateurs,
    getUtilisateur,
    modifierUtilisateur,
    supprimerUtilisateur, 
} = require ('../controller/utilisateur');



router.route("/utilisateurs").post(ajouterUtilisateur);
router.route("/utilisateurs").get(getTousUtilisateurs);
router.route("/utilisateurs/:id").get(getUtilisateur);
router.route("/utilisateurs/:id").put(modifierUtilisateur);
router.route("/utilisateurs/:id").delete(supprimerUtilisateur);



module.exports = router;