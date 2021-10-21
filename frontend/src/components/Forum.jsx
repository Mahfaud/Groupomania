import React, { useState, useEffect } from "react";


function GetPosts() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("http://localhost:8000/forum")
        .then((res) => {return res.json()})
        .then((data => setPosts(data)))
    }, [])

    return (
        <div>
            <div> {posts.map(post => <div>{post.post_id + " " + post.text + " " + post.fileUrl}</div>)}</div>
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
            body: form
        })
    }

    return (
        <form>
            <div className="form-group">
                <label className="form-check-label" htmlFor="textPost">Quoi de neuf ? </label>
                <textarea className="form-control" name="textPost" rows="3" maxLength="1000" onChange={e => setText(e.target.value)}></textarea>
                <input type="file" name="file" onChange={e => setFile(e.target.files[0])}></input>
                <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={submit} >Créer</button>
            </div>
        </form>
    )
}

function Forum () {
    return (
        <div className="container">
            <CreatePost></CreatePost>
            <GetPosts></GetPosts>
        </div>
    )
}

export default Forum;
  