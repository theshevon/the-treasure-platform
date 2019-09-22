import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

// bootstrap import
import Form from 'react-bootstrap/Form'

// custom css
import './add-item-form.css'

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

                    <Form.Group as={Row}>
                        <Form.Label column sm="3">
                        Name
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control name="name" type="text" required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="3">
                        Description
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control as="textarea" name="desc" rows="5" required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="3">
                        Value (Optional)
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" name="val" required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="3">
                        Visible to
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" name="visibleto" required />
                            <Form.Text className="text-muted">
                                If left blank, this item will be visible to all users.
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="3">
                        Assign to (Optional)
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" name="assignedto" required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="3">
                        Photos
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" name="assignedto" required />
                        </Col>
                    </Form.Group>

                    <Button className="btn" variant="light" type="submit" onClick={this.handleSubmit}>Add Item</Button>

                </Form>
            </div>
        )
    }
}

export default AddItemForm;
