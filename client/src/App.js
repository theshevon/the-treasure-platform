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
					<Redirect
						from="/"
						to="/items"/>

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
					<AuthRoute
						exact
						path="/dashboard"
						component={ dashboard }
						authenticated={ authenticated }/>

					{/* item catalogue */}
					<AuthRoute
						exact
						path="/items"
						component={ items }
						authenticated={ authenticated }/>
				</Switch>
			</Router>
		);
	}
}

export default App;