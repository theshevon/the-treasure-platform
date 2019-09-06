import React, { Component } from 'react';
import Link from "react-router-dom/Link";

// MUI imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    <Button color="inherit" component={ Link } to="/">Home</Button>
                    <Button color="inherit" component={ Link } to="/login">Log In</Button>
                    <Button color="inherit" component={ Link } to="/dashboard">Dashboard</Button>
                    <Button color="inherit" component={ Link } to="/items">Items</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar;