import React, { Component } from 'react'
import axios                from 'axios';

// boostrap imports
import Spinner from 'react-bootstrap/Spinner';
import Button  from 'react-bootstrap/Button';
import Form    from 'react-bootstrap/Form';
import Row     from 'react-bootstrap/Row';
import Col     from 'react-bootstrap/Col';

class Register extends Component {

    state = {
        fname     : '',
        lname     : '',
        email     : '',
        code      : '',
        pw        : '',
        pw_c      : '',
        pic       : null,
        loading   : false,
        stage     : 0,
        validated : false
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
                url: '/check_invitee',
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
                    errors: err.response.data,
                    loading: false,
                    validated: true
                });
            })
    }

    // handles the registration of a new user by sending the user's data
    // to the server
    handleRegistration = event => {

        event.preventDefault();

        this.setState({ loading: true });

        const registrationData = {
            fname : this.state.fname,
            lname : this.state.lname,
            email : this.state.email,
            pw    : this.state.pw,
            pw_c  : this.state.pw_c
        }

        if (this.state.pic){
            let fd   = new FormData();
            let file = this.state.pic;
            fd.append("file", file, file.name);
            this.handleDataTransfer(registrationData, fd);
        } else {
            this.handleDataTransfer(registrationData, null);
        }

        return;
    }

    handleDataTransfer = async (registrationData, fd) => {

        // send all the textual data
        let uid = await axios({
                                method: 'post',
                                url: '/register',
                                data: registrationData
                            })
                            .then(res => {
                                if (!fd){
                                    this.setState({ loading : false });
                                    this.props.history.push('/login');
                                }
                                return res.data;
                            })
                            .catch(err => {
                                this.setState({
                                    errors: err.response.data,
                                    loading: false,
                                    validated: true,
                                    pw: '',
                                    pw_c: ''
                                });
                            });

        if (this.state.errors) return;

        // send the image, if one has been uploaded
        if (fd){
            await axios({
                            method : 'put',
                            url    : `/users/${uid}/img_upload`,
                            headers: {
                                "content-type": "multipart/form-data"
                            },
                            data   : fd
                        })
                        .then(res => {
                            this.setState({ loading : false });
                            this.props.history.push('/login');
                        })
                        .catch(err => {
                            this.setState({
                                errors: err.response.data,
                                loading: false,
                                validated: true,
                                pw: '',
                                pw_c: ''
                            });
                        });
        }

    }

    handleUpload = async event => {
        await this.setState({ pic : event.target.files[0] });
    }

    render() {

        const { loading, stage, errors, validated } = this.state;

        // if loading, replace button text with a spinner
        let btnContent;
        if (loading){
            btnContent = (<Spinner animation="border" size="sm"/>);
        } else {
            if (stage === 0){
                btnContent = ("Next");
            } else {
                btnContent = ("Register");
            }
        }

        // -- decide on form content based on the stage that the user is on

        let formContent;

        if (stage === 0){

            // set up error messages
            let emailClass    = "login-field";
            let codeClass     = "login-field";
            let emailFeedback = "";
            let codeFeedback  = "";

            if (validated && this.state.errors){

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

                // check for code errors
                if (errors.code){
                    codeFeedback   = (
                        <p
                            className="invalid-feedback-msg">
                            { errors.code }
                        </p>
                    );
                    codeClass += " invalid-field";
                }

                // check for other errors
                if (errors.general){
                    emailFeedback = null;
                    codeFeedback   = (
                        <p
                            className="invalid-feedback-msg">
                            { errors.general }
                        </p>
                    );
                    emailClass += " invalid-field";
                    codeClass  += " invalid-field";
                }
            }

            formContent = (
                <Form>

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
                            className={emailClass}
                            name="email"
                            type="email"
                            placeholder="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required/>
                            { emailFeedback }
                    </Row>

                    {/* Invitation code field */}
                    <Row
                        className="my-1">
                        <Form.Control
                            className={codeClass}
                            name="code"
                            placeholder="invitation code"
                            value={this.state.code}
                            onChange={this.handleChange}
                            required/>
                            { codeFeedback }
                    </Row>

                    {/* Submit button */}
                    <Button
                        className="centered-btn btn mt-3"
                        variant="light"
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
            let fnameClass    = "login-field";
            let lnameClass    = "login-field";
            let pwClass       = "login-field";
            let fnameFeedback = "";
            let lnameFeedback = "";
            let pwFeedback    = "";

            if (validated && this.state.errors){

                // check for first name errors
                if (errors.fname){
                    fnameFeedback = (
                        <p
                            className="invalid-feedback-msg">
                            { errors.fname }
                        </p>
                    );
                    fnameClass += " invalid-field";
                }

                // check for last name errors
                if (errors.lname){
                    lnameFeedback = (
                        <p
                            className="invalid-feedback-msg">
                            { errors.lname }
                        </p>
                    );
                    lnameClass += " invalid-field";
                }

                // check for pw errors
                if (errors.pw){
                    pwFeedback   = (
                        <p
                            className="invalid-feedback-msg">
                            { errors.pw }
                        </p>
                    );
                    pwClass += " invalid-field";
                }

                // check for other errors
                if (errors.general){
                    fnameClass += " invalid-field";
                    lnameClass += " invalid-field";
                    pwClass    += " invalid-field";
                    fnameFeedback = null;
                    lnameFeedback = null;
                    pwFeedback   = (
                        <p
                            className="invalid-feedback-msg">
                            { errors.general }
                        </p>
                    );
                }
            }

            // decide on what text needs to be on the photo upload button
            let photoSelectText = "Select Profile Pic";
            if (this.state.pic){
                photoSelectText = "Pic Selected";
            }

            formContent = (

                <Form
                    encType="multipart/form-data">

                    <h1
                        className="form-title">
                        Almost There!
                    </h1>
                    <p
                        className="text-muted mb-4 text-center">
                        Just fill in a few final details and you'll be all
                        good to go!
                        <br/>
                        <strong>Note: </strong>Upon successful registration,
                        you will be redirected to the login page.
                    </p>


                    <Row
                        className="my-1">
                        <Form.Control
                            type="file"
                            onChange={this.handleUpload}
                            accept="image/*"
                            ref={fileUpload => this.fileUpload = fileUpload}
                            style={{ "display" : "none" }}/>
                        <Button
                            type="button"
                            className="centered-btn btn"
                            variant="light"
                            onClick={() => this.fileUpload.click()}>
                            {photoSelectText}
                        </Button>
                    </Row>

                    {/* Name fields */}
                    <Row
                        className="my-1">

                        {/* First Name field */}
                        <Col
                            xs="12"
                            sm="6"
                            className="pl-0 pr-1">
                            <Form.Control
                                className={ fnameClass }
                                name="fname"
                                placeholder="first name"
                                value={this.state.fname}
                                onChange={this.handleChange}
                                required/>
                            { fnameFeedback }
                        </Col>

                        {/* Last Name field */}
                        <Col
                            xs="12"
                            sm="6"
                            className="pl-1 pr-0">
                            <Form.Control
                                className={ lnameClass }
                                name="lname"
                                placeholder="last name"
                                value={this.state.lname}
                                onChange={this.handleChange}
                                required/>
                            { lnameFeedback }
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
                            className={ pwClass }
                            name="pw"
                            type="password"
                            placeholder="password"
                            value={this.state.pw}
                            onChange={this.handleChange}
                            required/>
                    </Row>

                    {/* Password confirmation field */}
                    <Row
                        className="my-1">
                        <Form.Control
                            className={ pwClass }
                            name="pw_c"
                            type="password"
                            placeholder="confirm password"
                            value={this.state.pw_c}
                            onChange={this.handleChange}
                            required/>
                        { pwFeedback }
                    </Row>

                    {/* Submit button */}
                    <Button
                        className="login-btn btn mt-3"
                        variant="light"
                        type="submit"
                        onClick={this.handleRegistration}
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
                        sm="8"
                        md="6"
                        lg="3">
                        { formContent }
                    </Col>
				</Row>
        )
    }
}

export default Register;
