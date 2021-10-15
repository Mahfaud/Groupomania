const mysql = require("mysql")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Configuration de la base de donnée
 const db = mysql.createConnection({
  host : "localhost",
  user : "root" ,
  password : process.env.DB_PASSWORD ,
  database : "groupomania"
})

exports.signUp = async (req, res) => {
    
    db.query("SELECT * FROM users WHERE email = (?)", [req.body.email], async (err, result) => {
        if (err) {
            throw err
        }
        const emailExist = result[0]

        if (!emailExist) {
            
             // Hashage du mot de passe
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt)

            db.query("INSERT INTO users VALUES(? , ?, ?, ?, ?, ?, ?)", [1, req.body.email, hashPassword, req.body.name, req.body.firstName, req.body.age, req.body.address], (err, result)=> {
                if (err) {
                console.log("Error")
                }
            res.send("Compte créé")
            })
        } else {
            res.status(400).send("Email already exist")
        }
    })
    
}

exports.logIn = (req, res) => {
    db.query("SELECT * FROM users WHERE email = (?)", [req.body.email], async (err, result) => {
        if (err) {
            throw err
        }
        const emailExist = result[0]

        if (!emailExist) {
            res.status(400).send("L'email n'existe pas !") 
        } 

        const validPass = await bcrypt.compare(req.body.password, emailExist.password)
        if (!validPass) {
            return res.status(400).send("Mot de passe erroné")
        }

        // Création d'un JSON Web Token
        const token = jwt.sign({user_id: emailExist.user_id}, process.env.TOKEN_SECRET, { expiresIn: '24h' })


        res.status(200).send({userId: emailExist.user_id, token: token})
        
})}