import React, { useState, useEffect } from "react";
import Header from "../Header/Header"
import "./profil.css";
var url = window.location.pathname;
var id = url.substring(url.lastIndexOf('/') + 1);
let  validInput = true
const tokenHeader = new Headers
const localToken = localStorage.getItem("token")
tokenHeader.append("authorization", "Bearer " + localToken)
let emailRegex = /(?:\s|^)(?![a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\S+\b(?=\s|$)/ig

function filterUserInput(minLetter, maxLetter, input, regex) {
    if (input.length > maxLetter || regex.test(input) || input.length < minLetter) {
        validInput = false
    }
  }
  


function Profil() {

    const [user, setUser] = useState("")
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [address, setAddress] = useState("")
    const [access, setAccess] = useState("")

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    useEffect( async () => {
      const response = await fetch("http://localhost:8000/profil/" + id, {
          headers: tokenHeader,
      })
      if (response.ok) {
        const data = await response.json()
        setUser(data.posts)
        setAccess(data.access)
      }
  }, [])


    const deleteProfil = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:8000/profil/' + id , {
        method: 'DELETE',
        headers: tokenHeader})
        if (response.ok) {
          localStorage.clear()
          window.location.href = "http://localhost:3000/"
        }
        
    }

    const submit = async (e) => {

        filterUserInput(6, 100, email , emailRegex)
  
        if (validInput) {
          e.preventDefault()
          const userData = {
            username: username,
            phone: phone,
            email : email,
            firstname: firstName,
            name: name,
            age: age,
            address: address
          }

          const response = await fetch("http://localhost:8000/profil/" + id, {
              method: "PUT",
              body: JSON.stringify(userData),
              headers: {"Content-Type" : "application/json", "Authorization" : "Bearer " + localToken}
          })
          if (response.ok) {
            window.location.href = "http://localhost:3000/profil/" + id
          }
          
        } else {
          e.preventDefault()
          console.log("Bad Input")
        }
      }
  
      const buttons = access ? <div className="profilButtons"><button className="w-100 btn btn-lg btn-primary" onClick={submit} >Modifiez votre compte</button>
      <button className="w-100 btn btn-lg btn-danger" onClick={deleteProfil} >Supprimez votre compte</button></div> : null

    return (
        <div className="profilBodyContainer">
          <Header></Header>
          {user ? <div className="profilContainer">
            <div className="profilInfoContainer">
              <h1 className="h3 mb-3 fw-normal">Votre compte</h1>
              <div className="form-group">
                <label htmlFor="Username">Pseudonyme</label>
                <input type="text" className="form-control"  placeholder={user.username} onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="PhoneNumber">Numéro de téléphone</label>
                <input type="text" className="form-control"  placeholder={user.phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="floatingInput">Adresse mail</label>
                <input type="email" className="form-control"  placeholder={user.email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="floatingPassword">Nom de famille</label>
                <input type="text" className="form-control"  placeholder={user.name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="floatingPassword">Prénom</label>
                <input type="text" className="form-control"  placeholder={user.firstname}onChange={e => setFirstName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="floatingPassword">Age</label>
                <input type="text" className="form-control" placeholder={user.age} onChange={e => setAge(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="floatingPassword">Adresse</label>
                <input type="text" className="form-control"placeholder={user.address} onChange={e => setAddress(e.target.value)} />
              </div>
              {buttons}
            </div>
          </div> : <div className="profilError"> Ce profil n'existe pas</div>}
        </div>
    );
  }
  
  export default Profil;