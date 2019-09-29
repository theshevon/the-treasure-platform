import React, { Component } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

class InviteForm extends Component {

    state = {
        noRows   : 5,                       // the default no of rows will be 5
        invitees : [{}, {}, {}, {}, {}],
        loading  : false
    }

    addRows = () => {
        let invitees = [...this.state.invitees];
        invitees.push({});
        this.setState({ 
                        noRows : (this.state.noRows + 1), 
                        invitees: invitees
                    });
    }

    handleSubmit = () => {
        console.log(this.state);

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
                errors    : err.response.data,
                loading   : false,
            })
        })
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

    render() {

        let formContent = [];
        for (var i=0; i< this.state.noRows; i++ ){
            formContent.push((
                                <Row
                                    className="my-2">
                                    <Col xs="6">
                                        <Form.Control
                                            name={ i + "-name" }
                                            placeholder="name"
                                            onChange={this.handleChange}/>
                                    </Col>
                                    <Col xs="6">
                                        <Form.Control
                                            name={ i + "-email" }
                                            type="email"
                                            placeholder="email"
                                            onChange={this.handleChange}/>
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
                <Form>
                    {formContent}
                    <a
                        className="add-row-btn float-left mt-4"
                        variant="light"
                        onClick={this.addRows}>
                        <span
                            className="mr-1">
                            +
                        </span>
                        <span>
                            Add Another
                        </span>
                    </a>
                    <hr className="mt-5"/>
                    <Button
                        className="float-right"
                        variant="dark" onClick={this.handleSubmit}>
                        { btnContent }
                    </Button>
                </Form>
        )
    
    }
}

export default InviteForm;
