const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const path = require('path');
const authRoute = require("./routes/auth")
const mysql = require("mysql")

// Configuration de la base de donnée
 const db = mysql.createConnection({
  host : "localhost",
  user : "root" ,
  password : process.env.DB_PASSWORD ,
  database : "groupomania"
})

// Connexion a la base de donnée
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database ON")
})

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// Authentifications Routes
app.use("/", authRoute)

// Application qui écoute au port 8000
app.listen(8000)