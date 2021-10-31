import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LogIn from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Profil from "./components/Profil/Profil";
import Forum from "./components/Forum/Forum";
import Post from "./components/Post/Post";
import "./app.css"


function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={LogIn}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/profil" component={Profil}></Route>
        <Route exact path="/forum" component={Forum}></Route>
        <Route path="/forum/post" component={Post}></Route>
      </Router>
    </div>
  );
}

export default App;
