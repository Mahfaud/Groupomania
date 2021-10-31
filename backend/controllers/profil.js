const mysql = require("mysql")

// Configuration de la base de donnée
 const db = mysql.createConnection({
  host : "localhost",
  user : "root" ,
  password : process.env.DB_PASSWORD ,
  database : "groupomania"
})

exports.getProfil = (req, res) => {
    db.query("SELECT * FROM users WHERE user_id = (?)", [req.params.id], (err, result) => {
        if (err) {
            res.status(500).send({message: "Erreur interne"})
        }
        res.send({posts: result[0], access: req.user.access})
    })
}

exports.updateProfil = (req, res) => {
    db.query("UPDATE users SET email = (?), phone =(?),  name = (?), firstname = (?), age = (?), address = (?) WHERE user_id = (?)", [req.body.email, req.body.phone, req.body.name, req.body.firstname, req.body.age, req.body.address, req.user.user_id],(err, result) => {
        if (err) {
            res.status(500).send({message: "Erreur interne"})
        }
        res.send({message: "Compte modifié"})
    })
}

exports.deleteProfil = (req, res) => {
    db.query("DELETE users FROM users WHERE user_id = (?)", [req.user.user_id], (err, result) => {
        if (err) {
            res.status(500).send({message: "Erreur interne"})
        }
        res.send({message: "Compte supprimé"})
    })
}