import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./stylesheets/App.css"

// pages
import dashboard from "./pages/dashboard";
import login from "./pages/login";
import items from "./pages/items";

class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route exact path="/" component={ login }/>
              <Route exact path="/dashboard" component={ dashboard }/>
              <Route exact path="/items" component={ items }/>
              <Route exact path="/login" component={ login }/>
            </Switch>
        </Router>
    );
  }
}

export default App;