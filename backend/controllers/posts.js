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
    console.log(req.headers)
    await db.query("SELECT * FROM posts", [], async (err, result) => {
        if (err) {
            throw err
        }
        res.send(result)
    })
}
