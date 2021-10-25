import React, { useState, useEffect } from "react";
const tokenHeader = new Headers
const localToken = localStorage.getItem("token")
tokenHeader.append("authorization", "Bearer " + localToken)
var url = window.location.pathname;
var id = url.substring(url.lastIndexOf('/') + 1);
  
function Post() {

  const [posts, setPost] = useState("")

    useEffect(() => {
        fetch("http://localhost:8000/forum/post/" + id, {
            headers: tokenHeader
        })
        .then((res) => {return res.json()})
        .then((data => setPost(data)))
    }, [])


    const deletePost = async (e) => {
        e.preventDefault()
        fetch('http://localhost:8000/forum/post/' + id , {
          headers: tokenHeader,
          method: "DELETE",
          })}

    return (
        <div className="form-signin">

          <div>{posts.post_id+ " " + posts.fileUrl + " " + posts.text}</div>
          
          <button className="w-100 btn btn-lg btn-danger" type="submit" onClick={deletePost} >Supprimez votre post</button>
      </div>
    );
  }
  
  export default Post;