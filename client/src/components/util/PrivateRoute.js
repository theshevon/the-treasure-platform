import React               from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect }         from 'react-redux';
import PropTypes           from 'prop-types';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
	<Route
		{...rest}
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