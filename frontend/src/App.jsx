import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";


function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={LogIn}></Route>
        <Route path="/signup" component={SignUp}></Route>
      </Router>
    </div>
  );
}

export default App;
