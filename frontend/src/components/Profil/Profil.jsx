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
    const [email, setEmail] = useState("")

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    useEffect( async () => {
      const response = await fetch("http://localhost:8000/profil/" + id, {
          headers: tokenHeader,
      })
      const data = await response.json()
      setUser(data)
  }, [])


    const deleteProfil = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:8000/profil/' + id , {
        method: 'DELETE',})
        const data = await response.json()
        console.log(data)
    }

    const submit = async (e) => {

        filterUserInput(6, 100, email , emailRegex)
  
        if (validInput) {
          e.preventDefault()
          const userData = {
            email : email,
          }
          const response = await fetch("http://localhost:8000/profil/" + id, {
              method: "PUT",
              body: JSON.stringify(userData),
              headers: {"Content-Type" : "application/json"}
          })
          const data = response.json()
          console.log(data)
        } else {
          e.preventDefault()
          console.log("Bad Input")
        }
      }

    return (
        <div className="profilBodyContainer">
          <Header></Header>
          <div className="profilContainer">
            <div className="profilInfoContainer">
            <h1 className="h3 mb-3 fw-normal">Votre compte</h1>
                <div className="profilUsername">
                    <p>{user.username}</p>
                </div>
                <div className="profilUsername">
                    <p>{user.email}</p>
                </div>
                <div className="profilPhone">
                    <p>{user.phone}</p>
                </div>
                <div className="profilName">
                    <p>{user.name}</p>
                </div>
                <div className="profilFirstName">
                    <p>{user.firstname}</p>
                </div>
                <div className="profilAge">
                    <p>{user.age}</p>
                </div>
                <div className="profilAddress">
                    <p>{user.address}</p>
                </div>
            </div>
      </div>
      <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={submit} >Modifiez votre compte</button>
          <button className="w-100 btn btn-lg btn-danger" type="submit" onClick={deleteProfil} >Supprimez votre compte</button>
        </div>
    );
  }
  
  export default Profil;