import React, { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";



export default class Login extends Component {
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
        <Form>
        <Form.Group controlId="formBasicEmail" onSubmit={this.gotEmail}>
          <Form.Label>Email address</Form.Label>
          <Col md={{ span: 6, offset: 3 }}>
            <Form.Control type="email" placeholder="Enter email" />
          </Col>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Col md={{ span: 6, offset: 3 }}>
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
