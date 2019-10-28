import React               from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect }         from 'react-redux';
import PropTypes           from 'prop-types';

/**
 * Represents a route that requires a user to be authenticated.
 */
const AuthenticatedRoute = ({ component: Component, authenticated, ...rest }) => (
	<Route
		{...rest}
		// if authenticated, render the required page
		// else, redirect to the login page
		render={props =>
					authenticated === true
					? <Component {...props}/>
					: <Redirect
						to='/login'/>
				}
	/>
);

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated
});

AuthenticatedRoute.propTypes = {
	user: PropTypes.object
}

export default connect(mapStateToProps)(AuthenticatedRoute);
