import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css"
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// components
import Navbar from "./components/Navbar";

// pages
import home from "./pages/home";
import dashboard from "./pages/dashboard";
import login from "./pages/login";
import register from "./pages/register";
import items from "./pages/items";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    useNextVariants: true,
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={ theme }>
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
      </MuiThemeProvider>
    );
  }
}

export default App;
