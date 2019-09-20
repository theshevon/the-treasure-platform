import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

// bootstrap import
import Form from 'react-bootstrap/Form'

// custom css
import './item-form.css'

class AddItemForm extends Component {

    handleNext = () => {
        if (this.state.stage < 5){
            this.setState({stage : this.state.stage + 1});
        }
    }

    handleSubmit = () => {
        console.log("Handle submit");
    }

    render() {
        return (
            <div>
                <Form>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                        Name
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                        <Form.Label column sm="3">
                        Description
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control as="textarea" rows="5" required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                        Value (Optional)
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" required />
                        </Col>
                    </Form.Group>

                    <Button className="btn" variant="light" type="submit" onClick={this.handleSubmit}>Add Item</Button>

                </Form>
            </div>
        )
    }
}

export default AddItemForm;
