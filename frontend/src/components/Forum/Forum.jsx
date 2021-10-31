import React, { useState, useEffect } from "react";
import Header from "../Header/Header"
import "./forum.css";
const tokenHeader = new Headers
const localToken = localStorage.getItem("token")
tokenHeader.append("authorization", "Bearer " + localToken)


function GetPosts() {
    const [posts, setPosts] = useState([])

    useEffect( async () => {
        const response = await fetch("http://localhost:8000/forum", {
            headers: tokenHeader
        })
        if (response.ok) {
            const data = await response.json()
            setPosts(data.posts)
        } else {
            window.location.href = "http://localhost:3000/"
        }
        
    }, [])

    return (
        <div className="forumAllPostContainer">
            <div className="forumAllPost"> {posts.map(post => 
                <a className="forumOnePost" href={"/forum/post/" + post.post_id}>
                    <div className="forumPostProfil">
                        <div> 
                            <h2 className="forumPostUser">{post.username}</h2>
                        </div>
                    </div>
                    <div className="forumTextContainer">
                        <p className="forumPostText">{post.text}</p>
                        <img className="forumPostImg" src={post.fileUrl}/>
                    </div>
                    <p className="forumPostDate">Post créé le {post.date}</p>
                </a>)}
            </div>
        </div>
    )
}


function CreatePost() {

    const [text, setText] = useState() 
    const [file, setFile] = useState()

    const submit = async (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append("text", text)
        form.append("file", file)

        const response = await fetch("http://localhost:8000/forum", {
            method: "POST",
            headers: tokenHeader,
            body: form
        })
        if (response.ok) {
            const data = await response.json()
            console.log(data)
        } else {
            window.location.href = "http://localhost:3000/"
        }
    }

    return (
        <form className="forumForm">
                <textarea placeholder="Quoi de neuf ?" className="form-control forumText" name="textPost" rows="3" maxLength="1000" onChange={e => setText(e.target.value)}></textarea>
                <label for="file" class="forumFile"> <i className="fas fa-images fa-2x"></i></label>
                <input type="file" name="file" id="file" onChange={e => setFile(e.target.files[0])}></input>
                <button className="btn btn-lg btn-secondary forumBtn" type="submit" onClick={submit} >Créer</button>
            
        </form>
    )
}

function Forum () {
    return (
        <div className="forumContainer">
            <Header></Header>
            <div className="forumPostContainer">
            <CreatePost></CreatePost>
            <GetPosts></GetPosts>
            </div>
        </div>
    )
}

export default Forum;
  