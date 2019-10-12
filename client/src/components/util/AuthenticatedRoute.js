import React               from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth }         from "../../context/auth";

function AuthenticatedRoute({ component: Component, ...rest }) {

	const authToken = useAuth();

	return (
		<Route
			{...rest}
			render={props =>
					authToken ? (
						<Component {...props}/>
					)	:	(
						<Redirect
							to={{ pathname:'/login',
								state: {
											showAlert : true,
											alertMsg  : 'Please log in first!'
										}}}/>
					)}/>
	);
}

export default AuthenticatedRoute;
