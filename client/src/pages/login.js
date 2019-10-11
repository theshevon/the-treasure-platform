import React, { Component } from 'react'
import axios from 'axios'

// bootstrap imports
import Spinner from 'react-bootstrap/Spinner'
import Button  from 'react-bootstrap/Button'
import Alert   from 'react-bootstrap/Alert'
import Form    from 'react-bootstrap/Form'
import Row     from 'react-bootstrap/Row'
import Col     from 'react-bootstrap/Col'

// custom css
import '../stylesheets/login.css'

class Login extends Component {

	state = {
		email     : "",
		password  : "",
		loading   : false,
		errors    : {},
		validated : false,
		showAlert : false,
		alertMsg  : null
	}

	componentDidMount(){

		try{
			this.setState({
							showAlert : this.props.location.state.showAlert,
							alertMsg  : this.props.location.state.alertMsg
			})
		} catch(err) {
			return;
		}
	}

	clearAlert = () => {
        this.setState({
                        showAlert : false,
                        alertMsg  : null,
        });
	}

	handleChange = event => {
		this.setState({ [event.target.name] : event.target.value });
	}

	handleSubmit = event => {

		event.preventDefault();

		this.setState({
			loading: true
		});

		const userData = {
			email: this.state.email,
			password: this.state.password
		}

		axios({
				method: 'post',
				url: '/login',
				data: userData
			})
			.then(token => {

				// set token as in all request headers
				axios.defaults.headers.common['Authorization'] = token;

				this.setState({ loading : false });
				this.props.history.push('/login');
			})
			.catch(err => {
				this.setState({
					email: "",
					password: "",
					errors: err.response.data,
					loading: false,
					validated: true
				})
			})
	}

	render() {

		let emailError, pwError, loginBtnContent;

		// check for email errors
		if (this.state.errors && (this.state.errors.email || this.state.errors.general)){
			if (this.state.errors.email){
				emailError = (this.state.errors.email);
			} else {
				emailError = ("");
			}
		} else{
			emailError = ("Please enter a valid email address.");
		}

		// check for password errors
		if (this.state.errors && (this.state.errors.password || this.state.errors.general)){
			if (this.state.errors.password){
				pwError = (this.state.errors.password);
			} else {
				pwError = (this.state.errors.general);
			}
		} else {
			pwError = ("Please enter a password.");
		}

		// if loading, replace button text with spinner
		if (this.state.loading){
			loginBtnContent = (<Spinner animation="border" size="sm"/>);
		} else {
			loginBtnContent = ("Log In");
		}

		let alert = null;
        if (this.state.showAlert){
            alert = (
					<Row
						className="d-flex justify-content-center">
						<Col
							xs="10"
							sm="6"
							md="3">
							<Alert
								className="mt-1 login-alert"
								variant="danger"
								style={{textAlign : "center"}}
								onClose={ this.clearAlert }
								dismissible>
								<p>
									{ this.state.alertMsg }
								</p>
							</Alert>
						</Col>
					</Row>
            )
        }

		return (

			<div
				className="main-container">

				<div
					className = "login-form-container">

					{ alert }

					<Row
						className="d-flex justify-content-center">

						<Col
							className="login-form-body p-5"
							xs="10"
							sm="6"
							md="3">

							<h1
								className="form-title mb-4">
								Welcome
							</h1>

							<Form
								noValidate
								validated={this.state.validated}
								onSubmit={this.handleSubmit}>

								<Row
									className="my-1">
									<Form.Control
										className="login-field"
										name="email"
										type="email"
										placeholder="email"
										value={this.state.email}
										onChange={this.handleChange}
										required/>
									<Form.Control.Feedback
										type="invalid">
										{emailError}
									</Form.Control.Feedback>
								</Row>

								<Row
									className="my-1">
									<Form.Control
										className="login-field"
										name="password"
										type="password"
										placeholder="password"
										value={this.state.password}
										onChange={this.handleChange}
										required/>
									<Form.Control.Feedback
										type="invalid">
										{pwError}
									</Form.Control.Feedback>
								</Row>

								<Button
									className="centered-btn btn mt-3"
									variant="light"
									type="submit"
									onClick={this.handleSubmit}
									disabled={this.state.loading}>
									{loginBtnContent}
								</Button>

							</Form>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

export default Login;