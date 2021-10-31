import React, { useState, useEffect } from "react";
import Header from "../Header/Header"
import "./post.css";


const localToken = localStorage.getItem("token")
const tokenHeader = new Headers
tokenHeader.append("authorization", "Bearer " + localToken)
var url = window.location.pathname;
var id = url.substring(url.lastIndexOf('/') + 1);
var randomBoolean = true



function GetAllComs () {

  const [coms, setComs] = useState([])

    useEffect( async () => {
        const response = await fetch("http://localhost:8000/forum/post/" + id + "/coms", {
            headers: tokenHeader
        })
        const data = await response.json()
        setComs(data)
    }, [])
    
  return (
      <div className="allComsContainer">
        {coms.map(com => <div className="postOneCom">
            <p className="">{com.text}</p>
            <p>Le {com.date} par {com.username}</p>
          </div>)}
      </div>
    )
}


function Post() {

  const [posts, setPost] = useState("")
  const [text, setText] = useState() 

    useEffect( async () => {
        const response = await fetch("http://localhost:8000/forum/post/" + id, {
            headers: tokenHeader
        })
        if (response.ok) {
          const data = await response.json()
          setPost(data)
        } else {
          window.location.href = "http://localhost:3000/"
        }
        
    }, [])


    const submit = (e) => {
      e.preventDefault()
      const coms = {text: text}
      fetch("http://localhost:8000/forum/post/" + id, {
          method: "POST",
          headers: {"Content-Type" : "application/json", "Authorization" : "Bearer " + localToken},
          body: JSON.stringify(coms)
      })
  }

    const deletePost = async (e) => {
        e.preventDefault()
        fetch('http://localhost:8000/forum/post/' + id , {
          headers: tokenHeader,
          method: "DELETE",
          })}

    const btnIf = randomBoolean ? <button className="btn btn-lg btn-danger postDeletePost" onClick={deletePost} >X</button> : null

    return (
      <div className="postBodyContainer">
        <Header></Header>
        {posts ? <div className="postBackground">
          <div className="postContainer">
            <img className="postImg" src={posts.fileUrl}/>
            <div  className="postComsContainer" >
              <div className="postCreator">
                <p>{posts.text}</p>
                <p>Crée par {posts.username} le {posts.date}</p>
                {btnIf}
              </div>
              <div className="postCreateComs">
                <textarea placeholder="Réagissez à ce post ! " className="form-control postComsInput" name="textPost" rows="3" maxLength="1000" id ="textPost" onChange={e => setText(e.target.value)}></textarea>
                <button className="btn btn-lg btn-primary postComsInputBtn" onClick={submit} >Envoyer</button>
              </div>
              <GetAllComs></GetAllComs>
            </div>
          </div>
        </div>: null}
      </div>
    );
  }
  
  export default Post;