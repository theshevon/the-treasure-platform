import React               from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect }         from 'react-redux';
import PropTypes           from 'prop-types';

const AuthenticatedRoute = ({ component: Component, authenticated, ...rest }) => (
	<Route
		{...rest}
		render={props =>
				authenticated === true
				?	<Component {...props}/>
				:	<Redirect
						to={{ pathname:'/login',
							  state: {
										showAlert : true,
										alertMsg  : 'Please log in first!'
									}}}/>
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
