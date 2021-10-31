const mysql = require("mysql")

// Configuration de la base de donnée
 const db = mysql.createConnection({
  host : "localhost",
  user : "root" ,
  password : process.env.DB_PASSWORD ,
  database : "groupomania"
})


exports.createPost = async (req, res) => {
    console.log(req.body)
    db.query("INSERT INTO posts VALUES( (?), (?), (?), (?), (?), (?))", [null, req.body.text, "http://localhost:8000/" + req.file.path, req.user.username, new Date().toLocaleDateString("fr-FR") , req.user.user_id], async (err, result) => {
        if (err) {
            res.status(500).send({message: "Erreur interne"})
        }
        res.status(201).send({message: "OK"})
    })
}

exports.getAllPosts = async (req, res) => {
    db.query("SELECT * FROM posts ORDER BY post_id DESC", [], async (err, result) => {
        if (err) {
            res.status(500).send({message: "Erreur interne"})
        }
        res.status(200).send(result)
    })
}

exports.getOnePost = async (req, res) => {
    db.query("SELECT * FROM posts WHERE post_id = (?)", [req.params.id], async (err, result) => {
        if (err) {
            res.status(500).send({message: "Erreur interne"})
        }
        res.status(200).send(result[0])
    })
}

exports.deleteOnePost = async (req, res) => {
    db.query("DELETE FROM posts WHERE post_id = (?)", [req.params.id], async (err, result) => {
        if (err) {
            res.status(500).send({message: "Erreur interne"})
        }
        res.status(200).send("Post supprimée")
    })
}



exports.getMyPosts = async (req,res) => {
    db.query("SELECT * FROM posts WHERE user_id = (?)", [req.params.id], async (err, result) => {
        if (err) {
            res.status(500).send({message: "Erreur interne"})
        }
        res.status(200).send(result)
    })
}

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