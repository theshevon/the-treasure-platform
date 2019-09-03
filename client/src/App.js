import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css"

// pages
import home from "./pages/home";
import login from "./pages/login";
import register from "./pages/register";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={ home }/>
            <Route path="/login" component={ login }/>
            <Route path="/register" component={ register }/>
          </Switch>
        </Router>
        <h1>Our App</h1>
      </div>
    );
  }
}

export default App;
