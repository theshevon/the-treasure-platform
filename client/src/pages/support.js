import React, { Component } from 'react';
import axios                from 'axios';

// bootstrap imports
import Spinner from 'react-bootstrap/Spinner';
import Button  from 'react-bootstrap/Button';
import Alert   from 'react-bootstrap/Alert';
import Form    from 'react-bootstrap/Form';
import Row     from 'react-bootstrap/Row';
import Col     from 'react-bootstrap/Col';

class support extends Component {

    state = {
        loading   : false,
        subject   : '',
        message   : '',
        showAlert : false,
        alertMsg  : ''
    }

    handleChange = event => {
		this.setState({ [event.target.name] : event.target.value });
    }

    // clears an alert message
    clearAlert = () => {
        this.setState({
                        showAlert : false,
                        alertMsg  : null,
        });
    }

    handleSubmit = event => {

        event.preventDefault();

        this.setState({ loading : true });

        let data = {
            subject        : this.state.subject,
            message        : this.state.message
        }

        axios({
                method : 'post',
                url    : '/support',
                data   :  data
            })
            .then((res) => {
                this.setState({
                                loading   : false,
                                topic     : '',
                                message   : '',
                                showAlert : true,
                                alertMsg  : "Thanks for you message! Someone from our team will get back to you shortly!"
                            });
                return
            })
            .catch(err => {
                this.setState({ errors : err.response.data });
            })
    }


    render() {

        let btnContent = ("Send");
        if (this.state.loading){
            btnContent = (<Spinner animation="border" size="sm"/>);
        }

        return (

            <div
                className="main-container cover-div">

                <Row
                    className="login-form-container d-flex justify-content-center">
                    <Col
                        className="login-form-body p-5"
                        xs="10"
                        sm="6"
                        md="4">

                        {/* Form header */}
                        <h1
                            className="form-title mb-2">
                            Tell Us What's Wrong
                        </h1>
                        <p
                            className="text-muted text-center mb-4">
                            Experiencing issues when trying to do something?<br/>Let us know and we'll work on fixing it right away!
                        </p>

                        {/* Support form */}
                        <Form
                            onSubmit={this.handleSubmit}>
                            <Row
                                className="my-1">
                                <Form.Control
                                    name="subject"
                                    placeholder="subject"
                                    value={this.state.subject}
                                    onChange={this.handleChange}
                                    required/>
                            </Row>
                            <Row
                                className="my-1">
                                <Form.Control
                                        as="textarea"
                                        name="desc"
                                        rows="5"
                                        placeholder="message"
                                        required
                                        onChange={this.handleChange}/>
                            </Row>
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
        )
    }
}

export default support
