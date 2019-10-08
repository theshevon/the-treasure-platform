import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import jwtDecode from 'jwt-decode';

// pages
import dashboard from './pages/dashboard'
import login     from './pages/login'
import items     from './pages/items'
import register  from './pages/register'

// custom components
import AuthRoute from './components/util/AuthRoute'

let authenticated;
const token = localStorage.TreasureIDToken;

if (token){
	const decodedToken = jwtDecode(token);

	// check if token has expired
	if (decodedToken * 1000 < Date.now()){
		authenticated = false;
		window.location.href = '/login';
	} else {
		authenticated = true;
	}
}

class App extends Component {

	render() {
		return (
			<Router>
				<Switch>
					
					{/* landing page - item catalogue  */}					
					{/* <Redirect
						from="/"
						to="/login"/> */}

					{/* login page */}
					<Route
						exact
						path="/login"
						component={ login }/>

					{/* registration page */}
					<Route
						exact
						path="/register"
						component={ register }/>

					{/* dashboard */}
                    <Route
                        exact
                        path="/dashboard"
                        component={ dashboard }/>
                    {/* item catalogue */}
                    <Route
                        exact
                        path="/items"
                        component={ items }/>
				</Switch>
			</Router>
		);
	}
}

export default App;