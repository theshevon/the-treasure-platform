import React, { Component } from 'react';
import Link from "react-router-dom/Link";

// MUI imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
});

class Navbar extends Component {

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {/* <AppBar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Toolbar className="nav-container">
                        <Button color="inherit" component={ Link } to="/">Home</Button>
                        <Button color="inherit" component={ Link } to="/login">Log In</Button>
                        <Button color="inherit" component={ Link } to="/dashboard">Dashboard</Button>
                        <Button color="inherit" component={ Link } to="/items">Items</Button>
                    </Toolbar>
                </AppBar> */}
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(Navbar);