import React, { useState } from "react";
let emailRegex = /(?:\s|^)(?![a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\S+\b(?=\s|$)/ig
var validInput = true

function filterUserInput(minLetter, maxLetter, input, regex) {
  if (input.length > maxLetter || regex.test(input) || input.length < minLetter) {
      validInput = false
  }
}


function SignUp() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [age, setAge] = useState("")
  const [address, setAddress] = useState("")

    const submit = async (e) => {

      filterUserInput(6, 100, email , emailRegex)
      filterUserInput(6, 150, password, /A-zÀ-ÿ/g)

      if (validInput) {
        e.preventDefault()
        console.log(validInput)
        const userData = {
          email : email,
          password: password,
          username: username,
          name : name,
          firstName: firstName,
          age: age,
          address: address
        }
        fetch("http://localhost:8000/signup", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {"Content-Type" : "application/json"}
        }).then((res) => console.log(res))
      } else {
        e.preventDefault()
        console.log("Bad Input")
      }
    }


    return (
        <div className="form-signin signupContainer">
        <form>
          <h1 className="h3 mb-3 fw-normal">Créez votre compte</h1>
      
          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
            <label htmlFor="floatingInput">Adresse mail</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <label htmlFor="floatingPassword">Mot de passe</label>
          </div>
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingPassword" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <label htmlFor="Username">Username</label>
          </div>
          <div className="form-floating">
            <input type="text" className="form-control" id="Name" placeholder="Name" onChange={e => setName(e.target.value)} />
            <label htmlFor="Name">Name</label>
          </div>
          <div className="form-floating">
            <input type="text" className="form-control" id="FirstName" placeholder="firstName" onChange={e => setFirstName(e.target.value)} />
            <label htmlFor="FirstName">FirstName</label>
          </div>
          <div className="form-floating">
            <input type="text" className="form-control" id="Age" placeholder="Age" onChange={e => setAge(e.target.value)} />
            <label htmlFor="Age">Age</label>
          </div>
          <div className="form-floating">
            <input type="text" className="form-control" id="Address" placeholder="Address" onChange={e => setAddress(e.target.value)} />
            <label htmlFor="Address">Address</label>
          </div>
          <button className="btn btn-lg btn-primary" type="submit"  onClick={submit} >Créez votre compte</button>
          <a href="/"> Déja inscrit(e) ? Connectez-vous ici !</a>
        </form>
      </div>
    );
  }
  
  export default SignUp;
  