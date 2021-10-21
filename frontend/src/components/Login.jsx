import React, { useState } from "react";
let emailRegex = /(?:\s|^)(?![a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\S+\b(?=\s|$)/ig
var validInput = true

function filterUserInput(minLetter, maxLetter, input, regex) {
  if (input.length > maxLetter || regex.test(input) || input.length < minLetter) {
      validInput = false
  }
}

function LogIn() {

  const [email, setEmail] = useState("")
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
        fetch("http://localhost:8000/", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {"Content-Type" : "application/json"}
        })
        .then((res) => (res.json()))
        .then((data) => {
          console.log(data)
          window.location.href = "http://localhost:3000/profil/" + data.userId
        })

      } else {
        console.log("Bad Input")
      }
    }

    return (
        <div className="form-signin container">
        <form>
          <h1 className="h3 mb-3 fw-normal">Connectez-vous !</h1>
      
          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
            <label htmlFor="floatingInput">Adresse mail</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            <label htmlFor="floatingPassword">Mot de passe</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={submit}>Se connecter</button>
        </form>
      </div>
    );
  }
  
  export default LogIn;
  