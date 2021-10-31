import React, { useState } from "react";
import img from "../../img/icon.png"
let validInput = true
let emailRegex = /(?:\s|^)(?![a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\S+\b(?=\s|$)/ig

function filterUserInput(minLetter, maxLetter, input, regex) {
  if (input.length > maxLetter || regex.test(input) || input.length < minLetter) {
      validInput = false
  }
}


function SignUp() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

    const submit = async (e) => {

      filterUserInput(6, 100, email , emailRegex)
      filterUserInput(6, 150, password, /A-zÀ-ÿ/g)

      if (validInput) {
        e.preventDefault()
        console.log(validInput)
        const userData = {
          email : email,
          phone : phone,
          password: password,
          username: username
        }
        let response = await fetch("http://localhost:8000/signup", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {"Content-Type" : "application/json"}
        })
        let data = await response.json()
        setMessage(data.message)
      } else {
        e.preventDefault()
        console.log("Bad Input")
      }
    }


    return (
        <div className="form-signin signupContainer">
          <div className="signupPresentation">
          <h1>Parce que Groupomania n'est pas qu'un simple lieu de travail, nous voulons faire de notre entreprise un lieu où chaque personne puisse se sentir à l'aise avec leurs collègues !</h1>
          <h2>Partager vos meilleurs moments de vies et discuter avec vos collègues grâce au réseau social Groupomania </h2>
        </div>
        <div className="signupFormContainer">
        <form className="signupForm">
          <img className="signupLogo" src={img}/>
          <h1 className="h3 mb-3 fw-normal">Créez votre compte</h1>
          <p>{message}</p>
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingUsername" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <label htmlFor="Username">Pseudonyme</label>
          </div>
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingPhoneNumber" placeholder="PhoneNumber" onChange={e => setPhone(e.target.value)} />
            <label htmlFor="PhoneNumber">Numéro de téléphone</label>
          </div>
          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
            <label htmlFor="floatingInput">Adresse mail</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <label htmlFor="floatingPassword">Mot de passe</label>
          </div>
          <button className="btn btn-lg btn-secondary" type="submit"  onClick={submit} >Créez votre compte</button>
          <a href="/"> Déja inscrit(e) ? Connectez-vous ici !</a>
        </form>
        </div>
      </div>
    );
  }
  
  export default SignUp;
  