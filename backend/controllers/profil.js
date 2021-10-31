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
        res.send(result[0])
    })
}

exports.updateProfil = (req, res) => {
    db.query("UPDATE users SET email = (?), name = (?), firstName = (?), age = (?), address = (?) WHERE user_id = (?)", [req.body.email, req.body.name, req.body.firstName, req.body.age, req.body.address, req.params.id],(err, result) => {
        if (err) {
            res.status(500).send({message: "Erreur interne"})
        }
        res.send(result[0])
    })
}

exports.deleteProfil = (req, res) => {
    db.query("DELETE users FROM users WHERE user_id = (?)", [req.params.id], (err, result) => {
        if (err) {
            res.status(500).send({message: "Erreur interne"})
        }
        res.send({message: "Compte supprimé"})
    })
}