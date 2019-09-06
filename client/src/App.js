import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css"

// components
import Navbar from "./components/Navbar";

// pages
import home from "./pages/home";
import dashboard from "./pages/dashboard";
import login from "./pages/login";
import register from "./pages/register";
import items from "./pages/items";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={ home }/>
              <Route exact path="/dashboard" component={ dashboard }/>
              <Route exact path="/items" component={ items }/>
              <Route exact path="/login" component={ login }/>
              <Route exact path="/register" component={ register }/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
