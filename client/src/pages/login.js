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
import { connect }   from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

class Login extends Component {

	state = {
		email     : "",
		password  : "",
		loading   : false,
		errors    : null,
		validated : false,
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.UI.errors){
			console.log(nextProps.UI.errors);
			this.setState({ errors : nextProps.UI.errors });
		}
	}

	handleChange = event => {
		this.setState({ [event.target.name] : event.target.value });
	}

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
							sm="6"
							md="3">

							{/* Page title */}
							<h1
								className="form-title mb-4">
								Welcome
							</h1>

							{/* Login form */}
							<Form>

								<Row
									className="my-1 d-flex justify-content-center">
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
									className="my-1 d-flex justify-content-center">
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
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired
}

const mapStatesToProps = (state) => ({
	user : state.user,
	UI   : state.UI
});

const mapActionsToProps = {
	loginUser
}

export default connect(mapStatesToProps, mapActionsToProps)(Login);