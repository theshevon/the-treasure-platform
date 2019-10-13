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
import login     from './pages/login';
import chest     from './pages/chest';
import register  from './pages/register';
import error     from './pages/error';

// custom components
import AuthenticatedRoute from './components/util/AuthenticatedRoute'
import PrivateRoute       from './components/util/PrivateRoute'

// redux stuff
import { Provider }                from 'react-redux';
import store                       from './redux/store';
import { SET_AUTHENTICATED }       from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

// local server URL (for dev)
axios.defaults.baseURL = 'http://localhost:5000/comp30022app/us-central1/api'

// global server URL
// axios.defaults.baseURL = 'https://us-central1-comp30022app.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		axios.defaults.headers.common['Authorization'] = token;
		store.dispatch(getUserData());
	}
}

class App extends Component{

	render() {
		return (
			<Provider
				store={ store }>
				<Router>
					<Switch>

						{/* landing page */}
						<AuthenticatedRoute
							exact
							path="/"
							component={ chest }/>

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
							path="/chest"
							component={ chest }/>

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