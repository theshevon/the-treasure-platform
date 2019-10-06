import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
			window.location.href = '/login';
			authenticated = false;
		} else {
			authenticated = true;
		}
}

class App extends Component {

render() {
	return (
		<Router>
			<Switch>
			<Route
				exact
				path="/"
				component={ login }/>
			<Route
				exact
				path="/dashboard"
				component={ dashboard }/>
			<Route
				exact
				path="/items"
				component={ items }/>
			<AuthRoute
				exact
				path="/login"
				component={ login }
				authenticated={ authenticated }/>
			<AuthRoute
				exact
				path="/register"
				component={ register }
				authenticated={ authenticated }/>
			</Switch>
		</Router>
	);
}

}

export default App;