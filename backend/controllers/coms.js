const mysql = require("mysql")

// Configuration de la base de donnée
 const db = mysql.createConnection({
  host : "localhost",
  user : "root" ,
  password : process.env.DB_PASSWORD ,
  database : "groupomania"
})


exports.createComs = async (req, res) => {
    console.log(req.body)
    db.query("INSERT INTO coms VALUES((?), (?), (?), (?), (?), (?))", [null, req.body.text, req.user.user_id, req.user.username, new Date().toLocaleDateString("fr-FR"), req.params.id], async (err, result) => {
        if (err) {
            res.status(500).send({message: "Erreur interne"})
        }
        res.status(201).send({message: "Commentaire créé"})
    })
}

exports.getAllComs = async (req,res) => {
    db.query("SELECT * FROM coms WHERE post_id = (?) ORDER BY coms_id DESC", [req.params.id], async (err,result) => {
        if (err) {
            res.status(500).send({message: "Erreur interne"})
        }
        res.send(result)
    })
}

exports.deleteOneCom = async (req, res) => {
    db.query("DELETE FROM coms WHERE coms_id = (?)", [req.body.coms_id], async (err, result) => {
        if (err) {
            res.status(500).send({message: "Erreur interne"})
        }
        res.send({message: "Commentaire supprimé"})
    })
}