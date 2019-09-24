import React, { Component } from 'react'
import axios from 'axios'

// bootstrap imports
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// custom components
import ImageSelector from './ImageSelector'

// custom css
import '../stylesheets/add-item-form.css'

class AddItemForm extends Component {

    state = {
        selectedFiles: null,
        selectingWatchers: true,
        stage: 0,
        coverImgIndex: 0
    }

    handleSubmit = () => {
        // use axios to send the data to the backend
        // console.log("Handle submit");
        this.setState({ stage: 1 });
    }

    handleFileSelect = (event) => {
        let selectedFiles = [];
        let uploadedFiles = Array.from(event.target.files);
        uploadedFiles.forEach(file => {
            selectedFiles.push(URL.createObjectURL(file));
        })
        this.setState({selectedFiles: selectedFiles})
    }

    handleOptionChange = () => {

        if (this.state.selectingWatchers){
            this.setState({selectingWatchers : false});
        } else {
            this.setState({selectingWatchers : true});
        }
    }

    validateFrom = () => {

    }

    handleImgSelect = (index) => {
        this.setState({ coverImgIndex : index });
    }

    render() {

        let visibilityLabel;
        let visibilityField;
        let form;

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

        if (this.state.stage == 0){
            form = (

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
                                style={{ "display" : "none" }}
                                required/>
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
                        onClick={this.handleSubmit}
                        disabled={this.state.selectedFiles ? false : true}>
                            {console.log("selected?: " + this.state.selectedFiles)}
                            Next
                    </Button>

                </Form>
            </div>
        )
        } else {

            form = (
                <Form>
                    <Row>

                        { this.state.selectedFiles.map((imgSrc, index) => (
                            <Col
                                key={index}
                                xs={12} md={4}
                                onClick={this.handleImgSelect}>
                                <img
                                    src={imgSrc}
                                    className={ index === this.state.coverImgIndex ? "img-fluid cover-img" : "img-fluid" }
                                ></img>
                            </Col>
                        ))}
                    </Row>

                    <Button
                        className="float-right btn"
                        variant="light"
                        type="submit"
                        onClick={this.handleSubmit(index)}>
                            Add Item
                    </Button>
                </Form>
            );
        }

        return form;
    }
}

export default AddItemForm;
