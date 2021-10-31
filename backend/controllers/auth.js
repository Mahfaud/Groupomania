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
    db.query("SELECT * FROM users WHERE email = (?) OR phone = (?)", [req.body.email, req.body.phone], async (err, result) => {
        if (err) {
            throw err
        }
        const emailOrPhoneExist = result[0]

        if (!emailOrPhoneExist) {
            
             // Hashage du mot de passe
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt)

            db.query("INSERT INTO users(email, phone, password, username) VALUES(?, ?, ?, ?)", [req.body.email, req.body.phone, hashPassword, req.body.username], (err, result)=> {
                if (err) {
                res.status(500).send({message: "Erreur, réeessayez !"})
                }
            res.status(201).send({message: "Compte créé"})
            })
        } else {
            res.status(400).send({message: "L'email ou le téléphone existe déja !"})
        }
    })
    
}

exports.logIn = (req, res) => {
    db.query("SELECT * FROM users WHERE email = (?) OR phone = (?)", [req.body.email, req.body.email], async (err, result) => {
        if (err) {
            throw err
        }
        const emailOrPhoneExist = result[0]

        if (!emailOrPhoneExist) {
            res.status(400).send({message:"L'adresse mail ou le numéro de téléphone n'existe pas !"}) 
        } 

        const validPass = await bcrypt.compare(req.body.password, emailOrPhoneExist.password)
        if (!validPass) {
            return res.status(400).send({message: "Mot de passe erroné"})
        }

        // Création d'un JSON Web Token
        const token = jwt.sign({user_id : emailOrPhoneExist.user_id, username: emailOrPhoneExist.username, role: emailOrPhoneExist.role}, process.env.TOKEN_SECRET, { expiresIn: '24h' })


        res.status(200).send({user_id: emailOrPhoneExist.user_id ,token: token})
        
})}