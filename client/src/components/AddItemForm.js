import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

// bootstrap import
import Form from 'react-bootstrap/Form'

// custom css
import '../stylesheets/add-item-form.css'

class AddItemForm extends Component {

    state = {
        selectedFile: null,
        selectingWatchers: true
    }

    handleNext = () => {
        if (this.state.stage < 5){
            this.setState({stage : this.state.stage + 1});
        }
    }

    handleSubmit = () => {
        // use axios to send the data to the backend
        console.log("Handle submit");
    }

    handleFileSelect = (event) => {
        this.setState({selectedFile: event.target.files[0]})
    }

    handleOptionChange = () => {

        if (this.state.selectingWatchers){
            this.setState({selectingWatchers : false});
        } else {
            this.setState({selectingWatchers : true});
        }
    }

    render() {

        let visibilityLabel;
        let visibilityField;

        if (this.state.selectingWatchers){
            visibilityLabel = "Visible to";
            visibilityField = (
                    <Form.Control
                        type="text"
                        name="visibleto"
                        required />
            );
        } else {
            visibilityLabel = "Hidden from";
            visibilityField = (
                <Form.Control
                    type="text"
                    name="hiddenfrom"
                    required />
            );
        }

        return (
            <div>
                <Form>

                    <Form.Group as={Row}>
                        <Form.Label
                            column
                            sm="3">
                            Name
                        </Form.Label>
                        <Col
                            sm="9">
                            <Form.Control
                                name="name"
                                type="text"
                                required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label
                            column
                            sm="3">
                            Description
                        </Form.Label>
                        <Col
                            sm="9">
                            <Form.Control
                                as="textarea"
                                name="desc"
                                rows="5"
                                required />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}>
                        <Form.Label
                            column
                            sm="3">
                            Value{" "}
                                <span
                                    className="text-muted">
                                    (Optional)
                                </span>
                        </Form.Label>
                        <Col
                            sm="9">
                            <Form.Control
                                type="text"
                                name="val"
                                required />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}>
                        <Col
                            sm="3">
                            <Form.Control
                                className="visibility-select"
                                as="select"
                                val={visibilityLabel}
                                onChange={this.handleOptionChange}>
                                <option>Visible to</option>
                                <option>Hidden from</option>
                            </Form.Control>
                        </Col>
                        <Col
                            sm="9">
                            {visibilityField}
                            <Form.Text
                                className="text-muted">
                                If left blank, this item will be visible to all users.
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}>
                        <Form.Label
                            column
                            sm="3">
                            Assign{" "}
                            <span
                                className="text-muted">
                                (Optional)
                            </span>
                        </Form.Label>
                        <Col
                            sm="9">
                            <Form.Control
                                type="text"
                                name="assignedto"
                                required />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}>
                        <Form.Label
                            column
                            sm="3">
                            Photos
                        </Form.Label>
                        <Col
                            sm="9">
                            <input
                                type="file"
                                onChange={this.handleFileSelect}
                                accept="image/*"
                                multiple
                                ref={fileInput => this.fileInput = fileInput}
                                style={{ "display" : "none" }}/>
                            <Button
                                type="button"
                                className="btn"
                                variant="light"
                                onClick={() => this.fileInput.click()}>
                                    Select Photos
                            </Button>

                        </Col>
                    </Form.Group>

                    <Button
                        className="float-right btn"
                        variant="light"
                        type="submit"
                        onClick={this.handleSubmit}>
                            Add Item
                    </Button>

                </Form>
            </div>
        )
    }
}

export default AddItemForm;
