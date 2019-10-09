import React, { Component } from 'react'
import axios from 'axios'

// bootstrap imports
import Spinner from 'react-bootstrap/Spinner'
import Button  from 'react-bootstrap/Button'
import Form    from 'react-bootstrap/Form'
import Row     from 'react-bootstrap/Row'
import Col     from 'react-bootstrap/Col'

// custom css
import '../stylesheets/login.css'

class Login extends Component {

	state = {
		email: "",
		password: "",
		loading: false,
		errors: {},
		validated: false
	};

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

		console.log(userData);

		axios({
				method: 'post',
				url: 'http://localhost:5000/comp30022app/us-central1/api/login',
				data: userData
			})
			.then(res => {

				this.setState({ loading:false });
				this.props.history.push('/items');
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

		return (
			<div
				className="main-container"
				style={{width:"100vw", height:"100vh"}}>
				<Row
					className="login-form-container d-flex justify-content-center">
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
		);
	}
}

export default Login;