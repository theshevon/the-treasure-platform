import React, { Component } from 'react'
import axios from 'axios'

// bootstrap imports
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

// custom css
import '../stylesheets/login.css'

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
	  password: "",
	  loading: false,
	  errors: {}
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
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
		url: 'http://localhost:5000/comp30022app/us-central1/api/login',
		data: userData
		})
		.then(res => {
			console.log(res.data);
			this.setState({loading:false});
			this.props.history.push('/items');
		})
		.catch(err => {
			// this.setState({
			// 	errors: err.response.data,
			// 	loading: false
			// })
			console.log(err);
		})
  }

  render() {
    return (
		<div className="main-container" style={{width:"100vw", height:"100vh"}}>
			<Row className="login-form-container d-flex justify-content-center">
				<Col className="login-form-body p-5" xs="12" md="3">
					<h1 className="login-form-title mb-4">Welcome</h1>
					<Form>
						<Row className="my-1">
							<Form.Control
								name="email"
								type="email"
								placeholder="email"
								value={this.state.email}
								onChange={this.handleChange}
								required/>
						</Row>
						<Row className="my-1">
							<Form.Control
								name="password"
								type="password"
								placeholder="password"
								value={this.state.password}
								onChange={this.handleChange}
								required/>
						</Row>
						<Button
							className="login-btn btn mt-3"
							type="submit"
							variant="light"
							onClick={this.handleSubmit}
						>Log In</Button>
					</Form>
				</Col>
			</Row>
		</div>
    );
  }
}

export default Login;