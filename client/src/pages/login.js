import React, { Component } from 'react'

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
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
		<div className="main-container" style={{width:"100vw", height:"100vh"}}>
			<Row className="login-form-container d-flex justify-content-center">
				<Col className="login-form-body p-5" xs="12" md="3">
					<h1 className="login-form-title mb-4">Welcome</h1>
					<Form>
						<Row className="my-1">
							<Form.Control type="email" placeholder="email"/>
						</Row>
						<Row className="my-1">
							<Form.Control type="password" placeholder="password"/>
						</Row>
						<Button className="login-btn btn mt-3" type="submit" variant="light">Log In</Button>
					</Form>
				</Col>
			</Row>
		</div>
    );
  }
}

export default Login;