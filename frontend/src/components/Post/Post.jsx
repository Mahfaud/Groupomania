import React, { useState, useEffect } from "react";
import Header from "../Header/Header"
import "./post.css";


const localToken = localStorage.getItem("token")
const tokenHeader = new Headers
tokenHeader.append("authorization", "Bearer " + localToken)
var url = window.location.pathname;
var id = url.substring(url.lastIndexOf('/') + 1);
var urlUserId = url.split("/")[3]


function GetAllComs () {

  const [coms, setComs] = useState([])

    useEffect( async () => {
        const response = await fetch("http://localhost:8000/forum/post/" + urlUserId + "/" + id + "/coms", {
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
  const [access, setAccess] = useState()

    useEffect( async () => {
        const response = await fetch("http://localhost:8000/forum/post/"+ urlUserId + "/" + id, {
            headers: tokenHeader
        })
        if (response.ok) {
          const data = await response.json()
          setPost(data.post)
          setAccess(data.access)
        } else {
          window.location.href = "http://localhost:3000/"
        }
        
    }, [])


    const submit = async (e) => {
      e.preventDefault()
      const coms = {text: text}
      const response = await fetch("http://localhost:8000/forum/post/"+ urlUserId + "/" + id, {
          method: "POST",
          headers: {"Content-Type" : "application/json", "Authorization" : "Bearer " + localToken},
          body: JSON.stringify(coms)
      })
      if (response.ok) {
        window.location.href = "http://localhost:3000/forum/post/" + id
      }
  }

    const deletePost = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:8000/forum/post/'+ urlUserId + "/" + id , {
          headers: tokenHeader,
          method: "DELETE",
          })
          if (response.ok) {
            window.location.href = "http://localhost:3000/forum"
          }
        }

    const btnIf = access ? <button className="btn btn-lg btn-danger postDeletePost" onClick={deletePost} >X</button> : null

    return (
      <div className="postBodyContainer">
        <Header></Header>
        {posts ? <div className="postBackground">
          <div className={posts.fileUrl ? "postContainer" : "postContainerMessage"}>
            {posts.fileUrl ? <img className="postImg" src={posts.fileUrl}/> : null}
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