import React, { useState } from 'react';
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

// redux stuff
import { Provider } from 'react-redux';
import store        from './redux/store';

// local server URL (for dev)
axios.defaults.baseURL = 'http://localhost:5000/comp30022app/us-central1/api'

// global server URL
// axios.defaults.baseURL = 'https://us-central1-comp30022app.cloudfunctions.net/api';

class App extends Component{

	render() {
		return (
			<Provider
				store={ store }>
				<Router>
					<Switch>

						{/* landing page */}
						<Route
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
						<Route
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