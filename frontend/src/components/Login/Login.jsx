import React, { useState } from "react";
import "./login.css";
import img from "../../img/icon.png"
let emailRegex = /(?:\s|^)(?![a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\S+\b(?=\s|$)/ig
var validInput = true

function filterUserInput(minLetter, maxLetter, input, regex) {
  if (input.length > maxLetter || regex.test(input) || input.length < minLetter) {
      validInput = false
  }
}

function LogIn() {

  const [email, setEmailPhone] = useState("")
  const [password, setPassword] = useState("")

    const submit = async (e) => {
      e.preventDefault()
      filterUserInput(6, 100, email , emailRegex)
      filterUserInput(6, 150, password, /A-zÀ-ÿ/g)

      if (validInput) {
        const userData = {
          email : email,
          password: password
        }
        let response = await fetch("http://localhost:8000/", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {"Content-Type" : "application/json"}
        })
        let data = await response.json()
        if (response.ok) {
          localStorage.setItem("token", data.token)
          
          window.location.href = "http://localhost:3000/profil/" + data.user_id
        } else {
          console.log(data.message)
          validInput = true
        }
        

      } else {
        console.log("Bad Input")
        validInput = true
      }
    }

    return (
      <div className="loginContainer">
        <div className="loginPresentation">
          <h1>Parce que Groupomania n'est pas qu'un simple lieu de travail, nous voulons faire de notre entreprise un lieu où chaque personne puisse se sentir à l'aise avec leurs collègues !</h1>
          <h2>Partager vos meilleurs moments de vies et discuter avec vos collègues grâce au réseau social Groupomania </h2>
        </div>
        <div className="loginFormContainer">
        <form className="loginForm">
          <img className="loginLogo" src={img}/>
          <h1 className="h4 mb-3 fw-normal text-center">Connectez-vous !</h1>
          <div className="form-floating">
              <input type="MailPhone" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmailPhone(e.target.value)}/>
              <label htmlFor="floatingMailPhone">Adresse Mail ou Telephone</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
              <label htmlFor="floatingPassword">Mot de passe</label>
            </div>
            <button className="w-100 btn btn-lg btn-secondary" type="submit" onClick={submit}>Se connecter</button>
            <a href="/signup"> Pas encore de compte ? Inscrivez-vous !</a>
          </form>
        </div>
      </div>
    );
  }
  
  export default LogIn;
  