import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";
import Profil from "./components/Profil";
import Forum from "./components/Forum";
import "./app.css";


function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={LogIn}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/profil" component={Profil}></Route>
        <Route path="/forum" component={Forum}></Route>
      </Router>
    </div>
  );
}

export default App;
