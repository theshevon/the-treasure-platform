import React               from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect }         from 'react-redux';
import PropTypes           from 'prop-types';

/**
 * Represents a route that requires a user to be both authenticated and
 * authorised (ie. be a Primary User).
 */
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
	<Route
		{...rest}
		// -- if a primary user is trying to access the page, render the page
		// -- if a secondary user is trying to access the page, redirect them to
		//    the login page
		// -- if an unauthenticates user is trying to access the page, redirect
		//    them to the error page
		render={props => {
							if (authenticated === true){
								if (parseInt(localStorage.TreasureUType) === 0){
									return <Component {...props}/>;
								} else {
									return <Redirect
												to='/error'/>;
								}
							} else {
								return <Redirect
											to='/login'/>;
							}
						}
				}
	/>
);

const mapStateToProps = (state) => ({
    authenticated : state.user.authenticated,
});

PrivateRoute.propTypes = {
	user: PropTypes.object
}

export default connect(mapStateToProps)(PrivateRoute);