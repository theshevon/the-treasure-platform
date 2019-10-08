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

class App extends Component {

	render() {
		return (
			<Router>
				<Switch>

					{/* landing page */}
					<Route
						exact
						path="/"
						component={ items }/>

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