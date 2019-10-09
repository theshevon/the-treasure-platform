import React, { Component } from 'react'
import axios from 'axios'

// bootstrap imports
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class InviteForm extends Component {

    state = {
        noRows   : 5,                       // the default no of rows will be 5
        invitees : [{}, {}, {}, {}, {}],
        loading  : false,
        errors   : null
    }

    // adds rows to the form
    addRows = () => {
        let invitees = [...this.state.invitees];
        invitees.push({});
        this.setState({ 
                        noRows : (this.state.noRows + 1), 
                        invitees: invitees
                    });
    }

    // handles changes made to input fields
    // when the value of an input field changes, its corresponding entry
    // in the state changes too
    handleChange = event => {

        let target_name = event.target.name;
        let dash_index = target_name.indexOf("-");
        let array_index = target_name.substring(0, dash_index);
        let field_name = target_name.substring(dash_index+1);

        let invitees = [...this.state.invitees]
        invitees[array_index][field_name] = event.target.value;

        this.setState({ invitees : invitees });
	}

    // sends the form data to the server
    handleSubmit = event => {

        event.preventDefault();

        this.setState({
			loading: true
        });

        // send the data to the server
		axios({
            method: 'post',
            url: 'http://localhost:5000/comp30022app/us-central1/api/invite',
            data: this.state.invitees
        })
        .then(res => {
            this.setState({ loading : false });
        })
        .catch(err => {
            this.setState({
                errors    : {"1-name" : "yo", "2-name": "bruh"},
                loading   : false,
                validated : true,
            })
        })
    }

    render() {

        let formContent = [];
        for (var i=0; i< this.state.noRows; i++ ){
            let field1 = i + "-name";
            let field2 = i + "-email";

            // check for errors
            let field1Error, field2Error;
            if (this.state.errors){

                if (this.state.errors[field1]){
                    field1Error = this.state.errors[field1];
                }
                if (this.state.errors[field2]){
                    field2Error = this.state.errors[field2];
                }
            }

            formContent.push((
                                <Row
                                    key={"row-" + i}
                                    className="my-2">
                                    <Col xs="6">
                                        <Form.Control
                                            name={ field1 }
                                            placeholder="name"
                                            onChange={this.handleChange}/>
                                        <Form.Control.Feedback
                                            type="invalid">
                                            {field1Error}
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col xs="6">
                                        <Form.Control
                                            name={ field2 }
                                            type="email"
                                            placeholder="email"
                                            onChange={this.handleChange}/>
                                        <Form.Control.Feedback
                                            type="invalid">
                                            {field2Error}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                            ));
        }

        // if loading, replace button text with a spinner
        let btnContent;
        if (this.state.loading){
            btnContent = (<Spinner animation="border" size="sm"/>);
        } else {
            btnContent = ("Send Invitations");
        }

        return (
                <Form
                    noValidate
                    // validated={this.state.validated}
                    onSubmit={this.handleSubmit}>
                    {formContent}
                    <Button
                        className="add-row-btn float-left mt-4"
                        variant="light"
                        onClick={this.addRows}>
                        <span>
                            + Add Another
                        </span>
                    </Button>
                    <hr className="mt-5"/>
                    <Button
                        className="float-right"
                        variant="dark"
                        type="submit"
                        disabled={this.state.loading}>
                        { btnContent }
                    </Button>
                </Form>
        )
    
    }
}

export default InviteForm;
