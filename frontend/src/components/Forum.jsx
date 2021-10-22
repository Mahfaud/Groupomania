import React, { useState, useEffect } from "react";
import Header from "../components/Header"
const tokenHeader = new Headers
const localToken = localStorage.getItem("token")
tokenHeader.append("authorization", "Bearer " + localToken)


function GetPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("http://localhost:8000/forum", {
            headers: tokenHeader
        })
        .then((res) => {return res.json()})
        .then((data => setPosts(data)))
    }, [])

    return (
        <div className="allContainer">
            <div className="allPostContainer"> {posts.map(post => 
                <a className="postContainer"><img className="postImg" src={post.fileUrl}/>
                    <div className="postText">
                        <h2 className="postTitle">{post.post_id}</h2>
                        <p className="postParagraph">{post.text}</p>
                    </div>
                </a>)}
            </div>
        </div>
    )
}


function CreatePost() {

    const [text, setText] = useState() 
    const [file, setFile] = useState()

    const submit = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append("text", text)
        form.append("file", file)

        fetch("http://localhost:8000/forum", {
            method: "POST",
            headers: tokenHeader,
            body: form
        })
    }

    return (
        <form id="postForm">
            <div className="form-group" id="postFormGroup">
                <textarea placeholder="Quoi de neuf ?" className="form-control" name="textPost" rows="3" maxLength="1000" id ="textPost" onChange={e => setText(e.target.value)}></textarea>
                <input type="file" name="file" id="file" onChange={e => setFile(e.target.files[0])}></input>
                <button className="btn btn-lg btn-primary" id="postBtn" type="submit" onClick={submit} >Créer</button>
            </div>
        </form>
    )
}

function Forum () {
    return (
        <div>
            <Header></Header>
            <div className="forumContainer">
            <CreatePost></CreatePost>
            <GetPosts></GetPosts>
        </div>
        </div>
    )
}

export default Forum;
  