import React, { useState } from "react";
const validInput = true
let emailRegex = /(?:\s|^)(?![a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\S+\b(?=\s|$)/ig

function filterUserInput(minLetter, maxLetter, input, regex) {
    if (input.length > maxLetter || regex.test(input) || input.length < minLetter) {
        validInput = false
    }
  }
  
  
function Profil() {

  
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [age, setAge] = useState("")
    const [address, setAddress] = useState("")


    const deleteProfil = async (e) => {
        e.preventDefault()
        fetch('http://localhost:8000/profil', {
        method: 'DELETE',}).then((res) => console.log(res))}

    const submit = async (e) => {

        filterUserInput(6, 100, email , emailRegex)
  
        if (validInput) {
          e.preventDefault()
          console.log(validInput)
          const userData = {
            email : email,
            name : name,
            firstName: firstName,
            age: age,
            address: address
          }
          fetch("http://localhost:8000/profil", {
              method: "PUT",
              body: JSON.stringify(userData),
              headers: {"Content-Type" : "application/json"}
          }).then((res) => console.log(res))
        } else {
          e.preventDefault()
          console.log("Bad Input")
        }
      }

    return (
        <div className="form-signin container">
        <form>
          <h1 className="h3 mb-3 fw-normal">Modifiez votre compte</h1>
      
          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
            <label htmlFor="floatingInput">Adresse mail</label>
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
          <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={submit} >Modifiez votre compte</button>
          <button className="w-100 btn btn-lg btn-danger" type="submit" onClick={deleteProfil} >Supprimez votre compte</button>
        </form>
      </div>
    );
  }
  
  export default Profil;