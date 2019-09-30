import React, { Component } from 'react'
import axios from 'axios'

// boostrap imports
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// custom components
// import RegistrationForm from '../components/RegistrationForm'

class Register extends Component {

    state = {
        fname:   null,
        lname:   null,
        email:   null,
        code :   null,
        pw:      null,
        pw_c:    null,
        loading: false,
        stage:   0,
        validated: false
    }

    handleChange = event => {
		this.setState({ [event.target.name] : event.target.value });
	}

    handleValidation = event => {

        this.setState({ stage : 1})

        event.preventDefault();

        this.setState({ loading: true });

        const inviteeData = {
            email: this.state.email,
            code: this.state.code
        }

        axios({
                method: 'post',
                url: 'http://localhost:5000/comp30022app/us-central1/api/check_invitee',
                data: inviteeData
            })
            .then(res => {
                this.setState({
                                loading : false,
                                stage   : 1
                              });
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false,
                    validated: true
                })
            })
    }

    handleRegistration = event => {

        event.preventDefault();

        this.setState({ loading: true });

        const registrationData = {
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            pw:    this.state.pw,
            pw_c:  this.state.pw_c
        }

        axios({
                method: 'post',
                url: 'http://localhost:5000/comp30022app/us-central1/api/register',
                data: registrationData
            })
            .then(res => {
                this.setState({loading:false});
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

        // if loading, replace button text with a spinner
        let btnContent;
        if (this.state.loading){
            btnContent = (<Spinner animation="border" size="sm"/>);
        } else {
            if (this.state.stage === 0){
                btnContent = ("Next");
            } else {
                btnContent = ("Register");
            }
        }

        // decide on form content based on the stage that the user is on
        let formContent;
        if (this.state.stage === 0){

            let emailError;

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


            formContent = (
                <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={this.handleSubmit}>

                    {/* Email field */}
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
                            {/* {emailError} */}
                        </Form.Control.Feedback>
                    </Row>

                    <Row
                        className="my-1">
                        <Form.Control
                            className="login-field"
                            name="code"
                            placeholder="invitation code"
                            value={this.state.code}
                            onChange={this.handleChange}
                            required/>
                        <Form.Control.Feedback
                            type="invalid">
                            {/* {pwError} */}
                        </Form.Control.Feedback>
                    </Row>

                    <Button
                        className="login-btn btn mt-3"
                        type="submit"
                        onClick={this.handleValidation}
                        disabled={this.state.loading}
                    >{btnContent}</Button>
                </Form>
            )
        } else {

            formContent = (

                <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={this.handleSubmit}>
                    <Row
                        className="my-1">
                        <Col
                            xs="12"
                            sm="6"
                            className="pl-0 pr-1">
                            <Form.Control
                                className="login-field"
                                name="fname"
                                placeholder="first name"
                                value={this.state.fname}
                                onChange={this.handleChange}
                                required/>
                            <Form.Control.Feedback
                                type="invalid">
                                {/* {emailError} */}
                            </Form.Control.Feedback>
                        </Col>
                        <Col
                            xs="12"
                            sm="6"
                            className="pl-1 pr-0">
                            <Form.Control
                                className="login-field"
                                name="lname"
                                placeholder="last name"
                                value={this.state.lname}
                                onChange={this.handleChange}
                                required/>
                            <Form.Control.Feedback
                                type="invalid">
                                {/* {emailError} */}
                            </Form.Control.Feedback>
                        </Col>
                    </Row>

                    {/* Email field (read-only) */}
                    <Row
                        className="my-1">
                        <Form.Control
                            className="login-field"
                            name="email"
                            type="email"
                            placeholder="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            readOnly/>
                        <Form.Control.Feedback
                            type="invalid">
                            {/* {emailError} */}
                        </Form.Control.Feedback>
                    </Row>

                    <Row
                        className="my-1">
                        <Form.Control
                            className="login-field"
                            name="pw"
                            type="password"
                            placeholder="password"
                            value={this.state.pw}
                            onChange={this.handleChange}
                            required/>
                        <Form.Control.Feedback
                            type="invalid">
                            {/* {pwError} */}
                        </Form.Control.Feedback>
                    </Row>
                    <Row
                        className="my-1">
                        <Form.Control
                            className="login-field"
                            name="pw_c"
                            type="password"
                            placeholder="confirm password"
                            value={this.state.pw_c}
                            onChange={this.handleChange}
                            required/>
                        <Form.Control.Feedback
                            type="invalid">
                            {/* {pwError} */}
                        </Form.Control.Feedback>
                    </Row>
                    <Button
                        className="login-btn btn mt-3"
                        type="submit"
                        onClick={this.handleSubmit}
                        disabled={this.state.loading}>
                        {btnContent}
                    </Button>
                </Form>
            )

        }

        return (
                <Row
					className="login-form-container d-flex justify-content-center">
                    <Col
                        className="login-form-body p-5"
                        xs="10"
                        sm="6"
                        md="3">
                        <h1
                            className="login-form-title mb-4"
                        >Welcome</h1>
                        { formContent }
                    </Col>
				</Row>
        )
    }
}

export default Register;
