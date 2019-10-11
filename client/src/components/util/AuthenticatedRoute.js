import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const AuthenticatedRoute = ({ component: Component, authenticated, ...rest }) => (
	<Route
		{...rest}
		render={ props => {
			console.log(authenticated);
			return  authenticated === true
					? <Component {...props} {...rest} />
					: <Redirect
						to={{ pathname:'/login',
							  state: {
								  		showAlert : true,
								  		alertMsg  : 'Please log in first!' }}}/>
		}}
	/>
);
export default AuthenticatedRoute;

