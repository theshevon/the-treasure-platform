import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// pages
import dashboard from './pages/dashboard'
import login from './pages/login'
import items from './pages/items'
import register from './pages/register'
import support from './pages/support'

class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route exact path="/" component={ login }/>
              <Route exact path="/dashboard" component={ dashboard }/>
              <Route exact path="/items" component={ items }/>
              <Route exact path="/login" component={ login }/>
              <Route exact path="/register" component={ register }/>
              <Route exact path="/support" component={ support }/>
            </Switch>
        </Router>
    );
  }
}

export default App;