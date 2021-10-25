const mysql = require("mysql")

// Configuration de la base de donnée
 const db = mysql.createConnection({
  host : "localhost",
  user : "root" ,
  password : process.env.DB_PASSWORD ,
  database : "groupomania"
})


exports.createPost = async (req, res) => {
    db.query("INSERT INTO posts VALUES( (?), (?), (?))", [null, req.body.text, "http://localhost:8000/" + req.file.path], async (err, result) => {
        if (err) {
            throw err
        }
        res.send("OK")
    })
}

exports.getAllPosts = async (req, res) => {
    db.query("SELECT * FROM posts", [], async (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
}

exports.getOnePost = async (req, res) => {
    db.query("SELECT * FROM posts WHERE post_id = (?)", [req.params.id], async (err, result) => {
        if (err) {
            throw err
        }
        res.send(result[0])
    })
}

exports.deleteOnePost = async (req, res) => {
    db.query("DELETE FROM posts WHERE post_id = (?)", [req.params.id], async (err, result) => {
        if (err) {
            throw err
        }
        res.send("Post supprimée")
    })
}