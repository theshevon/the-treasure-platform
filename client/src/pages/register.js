import React, { Component } from 'react'
import axios from 'axios'

// boostrap imports
import Spinner from 'react-bootstrap/Spinner'
import Button  from 'react-bootstrap/Button'
import Form    from 'react-bootstrap/Form'
import Row     from 'react-bootstrap/Row'
import Col     from 'react-bootstrap/Col'

class Register extends Component {

    state = {
        fname:   '',
        lname:   '',
        email:   '',
        code :   '',
        pw:      '',
        pw_c:    '',
        loading: false,
        stage:   1,
        validated: false
    }

    // handles changes made to input fields
    // when the value of an input field changes, its corresponding entry
    // in the state changes too
    handleChange = event => {
		this.setState({ [event.target.name] : event.target.value });
	}

    // handles the validation of the stage 0 data, which ensures that the
    // email address corresponds to an invited user and that the code entered
    // is the same as that linked to their record on the database
    handleValidation = event => {

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
                                loading  : false,
                                stage    : 1,
                                validated: false
                              });
            })
            .catch(err => {
                this.setState({
                    email: '',
                    code: '',
                    errors: err.response.data,
                    loading: false,
                    validated: true
                })
            })
    }

    // handles the registration of a new user by sending the user's data
    // to the server
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
                    errors: err.response.data,
                    loading: false,
                    validated: true
                });

                // clear all error fields
                Object.keys(this.state.errors).forEach(key => {
                    this.setState({ [key] : ''})
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

        // -- decide on form content based on the stage that the user is on

        let formContent;

        if (this.state.stage === 0){

            // set up error messages
            let emailErr, codeErr;
            if (this.state.errors){
                if (this.state.errors.email) emailErr = this.state.errors.email;
                if (this.state.errors.code) codeErr = this.state.errors.code;
                if (this.state.errors.general){
                    emailErr = ("");
                    codeErr = this.state.errors.general;
                }
            }

            formContent = (
                <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={this.handleValidation}>

                    <h1
                        className="form-title">
                        Let's Get Started!
                    </h1>
                    <p
                        className="text-muted mb-4 text-center">
                        Please enter your email address and the unique code that
                        was emailed to you.<br/>
                        <strong>Note: </strong>The email address entered must be
                        the same one that the invite was sent to.
                    </p>

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
                            { emailErr }
                        </Form.Control.Feedback>
                    </Row>

                    {/* Invitation code field */}
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
                            { codeErr }
                        </Form.Control.Feedback>
                    </Row>

                    {/* Submit button */}
                    <Button
                        className="login-btn btn mt-3"
                        type="submit"
                        onClick={this.handleValidation}
                        disabled={this.state.loading}>
                        {btnContent}
                    </Button>
                </Form>
            )
        }

        else {

            // set up error messages
            let fnameErr, lnameErr, pwError;
            if (this.state.errors){
                if (this.state.errors.fname) {
                    fnameErr = this.state.errors.fname;
                }
                if (this.state.errors.lname){
                    lnameErr = this.state.errors.lname;
                }
                if (this.state.errors.pw){
                    pwError = this.state.errors.pw;
                }
            }

            formContent = (

                <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={this.handleRegistration}>

                    <h1
                        className="form-title">
                        Almost There!
                    </h1>
                    <p
                        className="text-muted mb-4 text-center">
                        Just fill in your details and you'll be all good to go!
                    </p>

                    {/* Name fields */}
                    <Row
                        className="my-1">

                        {/* First Name field */}
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
                                { fnameErr }
                            </Form.Control.Feedback>
                        </Col>

                        {/* Last Name field */}
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
                                { lnameErr }
                            </Form.Control.Feedback>
                        </Col>
                    </Row>

                    {/* Email field (read-only now since it has alread been
                        validated) */}
                    <Row
                        className="my-1">
                        <Form.Control
                            className="login-field"
                            name="email"
                            type="email"
                            placeholder="email"
                            value={this.state.email}
                            readOnly/>
                    </Row>

                    {/* Password field */}
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
                            { "" }
                        </Form.Control.Feedback>
                    </Row>

                    {/* Password confirmation field */}
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
                            { pwError }
                        </Form.Control.Feedback>
                    </Row>

                    {/* Submit button */}
                    <Button
                        className="login-btn btn mt-3"
                        type="submit"
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
                        { formContent }
                    </Col>
				</Row>
        )
    }
}

export default Register;
