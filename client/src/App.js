import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route }
from 'react-router-dom';
import axios        from 'axios';
import jwtDecode    from 'jwt-decode';

// pages
import dashboard from './pages/dashboard';
import register  from './pages/register';
import support   from './pages/support';
import error     from './pages/error';
import items     from './pages/items';
import login     from './pages/login';

// custom components
import AuthenticatedRoute from './components/util/AuthenticatedRoute';
import PrivateRoute       from './components/util/PrivateRoute';

// redux stuff
import { Provider }                from 'react-redux';
import store                       from './redux/store';
import { SET_AUTHENTICATED }       from './redux/types';
import { logoutUser, setUserData } from './redux/actions/userActions';

// local server URL (for dev)
// axios.defaults.baseURL = 'http://localhost:5000/comp30022app/us-central1/api';

// global server URL
axios.defaults.baseURL = 'https://us-central1-comp30022app.cloudfunctions.net/api';

// extract the auth token from the browser
const token = localStorage.TreasureIDToken;
if (token) {
	const decodedToken = jwtDecode(token);

	// if the token has expired, redirect the user to the login page
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	}
	// else, update the global auth info
	else {
		store.dispatch({ type: SET_AUTHENTICATED });
		store.dispatch(setUserData());
		axios.defaults.headers.common['Authorization'] = token;
	}
}

/**
 * Represents the entry point for the Application.
 */
class App extends Component{

	render() {

		return (
			<Provider
				store={ store }>

				<Router>
					<Switch>

						{/* landing page- items */}
						<AuthenticatedRoute
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
						<PrivateRoute
							exact
							path="/dashboard"
							component={ dashboard }/>

						{/* item catalogue */}
						<AuthenticatedRoute
							exact
							path="/items"
							component={ items }/>

						{/* support page */}
						<AuthenticatedRoute
							exact
							path="/support"
							component={ support }/>

						{/* error page */}
						<Route
							component={ error }/>

					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default App;