import React               from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect }         from 'react-redux';
import PropTypes           from 'prop-types';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
	<Route
		{...rest}
		render={props =>
					(authenticated === true && parseInt(localStorage.TreasureUType) === 0)
					? <Component {...props}/>
					: <Redirect
						to='/error'/> // redirects to error page
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