import React, { Component } from 'react';
import axios                from 'axios';

// bootstrap imports
import Spinner from 'react-bootstrap/Spinner';
import Button  from 'react-bootstrap/Button';
import Alert   from 'react-bootstrap/Alert';
import Form    from 'react-bootstrap/Form';
import Row     from 'react-bootstrap/Row';
import Col     from 'react-bootstrap/Col';

// custom components
import Navbar  from '../components/util/Navbar';

/**
 * Represents the `Support` page that the users can visit to request technical
 * support from the development team.
 */
class Support extends Component {

    state = {
        loading   : false,
        subject   : '',
        message   : '',
        showAlert : false,
        alertMsg  : '',
        errors    : {},
        validated : false
    }

    /**
     * Handles changes made to input fields.
     * When the value of an input field changes, its corresponding entry in the
     * state changes too.
     */
    handleChange = event => {
		this.setState({ [event.target.name] : event.target.value });
    }

    /**
     * Clears an alert.
     */
    clearAlert = () => {
        this.setState({
                        showAlert : false,
                        alertMsg  : null,
        });
    }

    /**
     * Sends the form data to the server.
     */
    handleSubmit = event => {

        event.preventDefault();

        // clear any alert that's already there
        this.clearAlert();

        this.setState({ loading : true });

        let data = {
            subject        : this.state.subject,
            message        : this.state.message
        }

        // send the data to the server
        axios({
                method : 'post',
                url    : '/support',
                data   :  data
            })
            .then(res => {
                this.setState({
                                loading   : false,
                                subject   : '',
                                message   : '',
                                showAlert : true,
                                alertMsg  : "Thanks for your message! Someone from our team will get back to you shortly!",
                                validated : false,
                                errors    : {}
                            });
                return
            })
            .catch(err => {
                this.setState({
                                loading   : false,
                                validated : true,
                                errors    : err.response.data
                            });
            });
    }

    render() {

        let errors    = this.state.errors;
        let validated = this.state.validated;

        // if loading, replace button text with a spinner
        let btnContent = ("Send");
        if (this.state.loading){
            btnContent = (<Spinner animation="border" size="sm"/>);
        }

        // create an alert, if needed
        let alert = null;
        if (this.state.showAlert){
            alert = (
                <Alert
                    className="mt-1"
                    variant="success"
                    style={{ textAlign : "center" }}
                    onClose={ this.clearAlert }
                    dismissible>
                    <p>
                        { this.state.alertMsg }
                    </p>
                </Alert>
            )
        }

        // -- check for errors and error feedback

        let subjectClass    = "";
        let messageClass    = "";
        let subjectFeedback = null;
        let messageFeedback = null;

        if (validated){
            if (errors.subject){
                subjectFeedback = (
                    <p
                        className="invalid-feedback-msg">
                        { errors.subject }
                    </p>
                );
                subjectClass = "invalid-field";
            } else {
                subjectClass = "valid-field";
            }

            if (errors.message){
                messageFeedback = (
                    <p
                        className="invalid-feedback-msg">
                        { errors.message }
                    </p>
                );
                messageClass = "invalid-field";
            } else {
                messageClass = "valid-field";
            }

            if (errors.general){
                subjectFeedback = null;
                messageFeedback = (
                    <p
                        className="invalid-feedback-msg">
                        { errors.general }
                    </p>
                );
                messageClass = "";
                subjectClass = "";
            }
        }

        return (

            <div>

                <Navbar/>

                <div
                    className="main-container cover-div">

                    <Row
                        className="login-form-container d-flex justify-content-center">

                        <Col
                            className="login-form-body p-5"
                            xs="10"
                            sm="8"
                            md="6"
                            lg="4">

                            {/* alert */}
                            { alert }

                            {/* form header */}
                            <h1
                                className="form-title mb-2">
                                Tell Us What's Wrong
                            </h1>
                            <p
                                className="text-muted text-center mb-4">
                                Experiencing issues when trying to do something?<br/>Let us know and we'll work on fixing it right away!
                            </p>

                            {/* support form */}
                            <Form>

                                <Row
                                    className="my-1">
                                    <Form.Control
                                        className={ subjectClass }
                                        name="subject"
                                        placeholder="subject"
                                        value={this.state.subject}
                                        onChange={this.handleChange}
                                        required/>
                                    { subjectFeedback }
                                </Row>

                                <Row
                                    className="my-1">
                                    <Form.Control
                                        className={ messageClass }
                                        as="textarea"
                                        name="message"
                                        rows="5"
                                        placeholder="message"
                                        value={this.state.message}
                                        required
                                        onChange={this.handleChange}/>
                                    { messageFeedback }
                                </Row>

                                {/* submit button */}
                                <Button
                                    className="btn centered-btn mt-3"
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
        )
    }
}

export default Support;
