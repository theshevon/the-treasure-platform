import React, { Component } from 'react';
import PropTypes            from 'prop-types';

// bootstrap imports
import Spinner from 'react-bootstrap/Spinner';
import Button  from 'react-bootstrap/Button';
import Form    from 'react-bootstrap/Form';
import Row     from 'react-bootstrap/Row';
import Col     from 'react-bootstrap/Col';

// custom css
import '../stylesheets/login.css';

// redux stuff
import { connect }               from 'react-redux';
import { loginUser, logoutUser } from '../redux/actions/userActions';

/**
 * Represents the 'Login` page that users will use to log in to the platform.
 */
class Login extends Component {

	state = {
		email     : "",
		password  : "",
		loading   : false,
		errors    : null,
		validated : false,
	}

	componentDidMount(){

		// logout a logged-in user if they navigate to the login page
		if (localStorage.TreasureIDToken){
			this.props.logoutUser();
		}
	}

	componentWillReceiveProps(nextProps){

		// update errors, provided that they are received from the server
		if (nextProps.UI.errors){
			this.setState({
							errors   : nextProps.UI.errors,
							password : ""
						  });
		}
	}

	/**
     * Handles changes made to input fields.
     * When the value of an input field changes, its corresponding entry in the
     * state changes too.
     */
	handleChange = event => {
		this.setState({ [event.target.name] : event.target.value });
	}

	/**
     * Sends the form data to the server.
     */
	handleSubmit = event => {

		event.preventDefault();

		const userData = {
			email    : this.state.email,
			password : this.state.password
		}

		this.props.loginUser(userData, this.props.history);
		this.setState({ validated : true });
	}

	render() {

		const { UI: { loading, errors }} = this.props;

		let btnContent;

		// -- check for errors

		let emailClass    = "login-field";
		let pwClass       = "login-field";
		let emailFeedback = "";
		let pwFeedback    = "";

		if (this.state.validated && errors){

			// check for email errors
			if (errors.email){
                emailFeedback = (
                    <p
                        className="invalid-feedback-msg">
                        { errors.email }
                    </p>
                );
                emailClass += " invalid-field";
			}

            if (errors.password){
                pwFeedback = (
                    <p
                        className="invalid-feedback-msg">
                        { errors.password }
                    </p>
                );
                pwClass += " invalid-field";
            }

            if (errors.general){
                emailFeedback = null;
                pwFeedback   = (
                    <p
                        className="invalid-feedback-msg">
                        { errors.general }
                    </p>
                );
                emailClass += " invalid-field";
                pwClass    += " invalid-field";
			}
		}

		// if loading, replace button text with spinner
		if (loading){
			btnContent = (<Spinner animation="border" size="sm"/>);
		} else {
			btnContent = ("Log In");
		}

		return (
			<div
				className="main-container">

				<div
					className = "login-form-container">

					<Row
						className="d-flex justify-content-center">

						<Col
							className="login-form-body p-5"
							xs="10"
							sm="8"
							md="6"
							lg="3">

							{/* page title */}
							<h1
								className="form-title mb-4">
								Welcome
							</h1>

							{/* login form */}
							<Form>

								<Row
									className="my-1 d-flex justify-content-center px-3">
									<Form.Control
										className={ emailClass }
										name="email"
										type="email"
										placeholder="email"
										value={this.state.email}
										onChange={this.handleChange}
										required/>
									{ emailFeedback }
								</Row>

								<Row
									className="my-1 d-flex justify-content-center px-3">
									<Form.Control
										className={ pwClass }
										name="password"
										type="password"
										placeholder="password"
										value={this.state.password}
										onChange={this.handleChange}
										required/>
									{ pwFeedback }
								</Row>

								{/* login button */}
								<Button
									className="centered-btn btn mt-3"
									variant="light"
									type="submit"
									onClick={this.handleSubmit}
									disabled={this.state.loading}>
									{btnContent}
								</Button>

							</Form>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser  : PropTypes.func.isRequired,
	logoutUser : PropTypes.func.isRequired,
	user       : PropTypes.object.isRequired,
	UI         : PropTypes.object.isRequired
}

const mapStatesToProps = (state) => ({
	user : state.user,
	UI   : state.UI
});

const mapActionsToProps = {
	loginUser,
	logoutUser
}

export default connect(mapStatesToProps, mapActionsToProps)(Login);