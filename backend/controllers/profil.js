const mysql = require("mysql")

// Configuration de la base de donnée
 const db = mysql.createConnection({
  host : "localhost",
  user : "root" ,
  password : process.env.DB_PASSWORD ,
  database : "groupomania"
})

exports.getProfil = (req, res) => {
    db.query("SELECT * FROM users WHERE user_id = 1", (err, result) => {
        if (err) {
            throw err
        }
        res.send(result[0])
    })
}

exports.updateProfil = (req, res) => {
    db.query("UPDATE users SET email = (?), name = (?), firstName = (?), age = (?), address = (?) WHERE user_id = 1", [req.body.email, req.body.name, req.body.firstName, req.body.age, req.body.address],(err, result) => {
        if (err) {
            throw err
        }
        res.send(result[0])
    })
}

exports.deleteProfil = (req, res) => {
    db.query("DELETE users FROM users WHERE user_id = 1", (err, result) => {
        if (err) {
            throw err
        }
        console.log(result)
        res.send("Compte supprimé")
    })
}