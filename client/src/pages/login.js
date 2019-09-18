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
		<div>
			<h1 className="form-title">Welcome</h1>
			<div className="form">
				<Row className="d-flex justify-content-center">
					<Col xs="12" md="4">
						<Form>
							<Row className="my-1">
								<Form.Control type="email" placeholder="email"/>
							</Row>
							<Row className="my-1">
								<Form.Control type="password" placeholder="password"/>
							</Row>
							<Button className="btn mt-2" type="submit" variant="light">Log In</Button>
						</Form>
					</Col>
				</Row>
			</div>
		</div>
    );
  }
}

export default Login;