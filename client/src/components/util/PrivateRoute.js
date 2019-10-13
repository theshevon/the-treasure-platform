import React               from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect }         from 'react-redux';
import PropTypes           from 'prop-types';

const PrivateRoute = ({ component: Component, authenticated, type, ...rest }) => (
	<Route
		{...rest}
		render={props =>
					(authenticated === true && type === 0)
					? <Component {...props}/>
					: <Redirect
						to={{ pathname:'/chest',
							state: {
										showAlert : true,
										alertMsg  : 'Please log in first!'
									}}}/>
				}
	/>
);

const mapStateToProps = (state) => ({
    authenticated : state.user.authenticated,
    type         : state.user.type
});

PrivateRoute.propTypes = {
	user: PropTypes.object
}

export default connect(mapStateToProps)(PrivateRoute);
