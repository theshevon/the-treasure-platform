import React, { Component } from 'react'
import axios from 'axios'
import Multiselect from 'react-bootstrap-multiselect'

// bootstrap imports
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// custom css
import '../stylesheets/add-item-form.css'

import users from '../data/users'

class AddItemForm extends Component {

    state = {
        selectedFiles: [],
        selectingWatchers: true,
        stage: 0,
        coverImgIndex: 0,
        validated: [false, false],
        loading: false,
        users: users,
        visibleto: []
    }

    handleSubmit = (event) => {

        const form = event.currentTarget;

        if (this.state.stage === 0){
            console.log(form.checkValidity());
            if (form.checkValidity()) {
                this.setState({ stage: 1 });
            } else {
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }

    handleFileSelect = (event) => {
        if (this.state.selectedFiles.length === 0){
            let selectedFiles = [];
            let uploadedFiles = Array.from(event.target.files);
            uploadedFiles.forEach(file => {
                selectedFiles.push(URL.createObjectURL(file));
            })
            this.setState({selectedFiles: selectedFiles})
        } else {
            this.setState({selectedFiles: []})
        }
    }

    handleVisibilityOptionChange = () => {

        if (this.state.selectingWatchers){
            this.setState({selectingWatchers : false});
        } else {
            this.setState({selectingWatchers : true});
        }
        this.setState({ visiblto : [] });
    }

    handleImgSelect = (index) => {
        this.setState({ coverImgIndex : index });
    }

    handleReturn = () => {
        this.setState({
                        stage: 0,
                        validated: [false, false]
                      });

    }

    // componentDidMount(){
    //     axios.get({
    //                     method: 'get',
    //                     url: 'http://localhost:5000/comp30022app/us-central1/api/users'
    //                 })
    //                 .then(res => {
    //                     this.setState({
    //                         users: res.data
    //                     })
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                 });
    // }

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

        if (this.state.stage === 0){
            form = (

                <div>
                    <Form
                        noValidate
                        validated={this.state.validated[0]}
                        onSubmit={this.handleSubmit}>

                        <Form.Group
                            as={Row}>
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
                                <Form.Control.Feedback type="invalid">
                                    Please enter an item name.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}>
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
                                <Form.Control.Feedback type="invalid">
                                    Please enter a description of the item.
                                </Form.Control.Feedback>
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
                                    onChange={this.handleVisibilityOptionChange}>
                                    <option>Visible to</option>
                                    <option>Hidden from</option>
                                </Form.Control>
                            </Col>
                            <Col
                                sm="9">
                                {/* {visibilityField} */}
                                <Form.Control
                                    className="user-select"
                                    as="select"
                                    val={visibilityLabel}
                                    onChange={this.handleVisibilityOptionChange}>
                                    <option>Visible to</option>
                                    <option>Hidden from</option>
                                </Form.Control>
                                {/* <Form.Text
                                    className="text-muted">
                                    If left blank, this item will be visible to all users.
                                </Form.Text> */}
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}>
                            <Form.Label
                                column
                                sm="3">
                                Assign to{" "}
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
                                    as="select"
                                    required>
                                    <option
                                        selected
                                        disabled
                                        hideen
                                    >Select User</option>
                                    { this.state.users.map(user => (
                                        <option>{user.name}</option>
                                    ))}
                                </Form.Control>
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
                                onClick={this.handleImgSelect.bind(this, index)}
                                className={ index === this.state.coverImgIndex? "selected-img m-1" : "non-selected-img m-1"}>
                                <img
                                    src={imgSrc}
                                    className={ "img-fluid" }
                                ></img>
                            </Col>
                        ))}
                    </Row>

                    <Button
                        type="button"
                        variant="light"
                        onClick={this.handleReturn}
                    >
                        Back
                    </Button>

                    <Button
                        className="float-right btn"
                        variant="light"
                        type="submit"
                        onClick={this.handleSubmit}>
                            Add Item
                    </Button>
                </Form>
            )
        }

        return form;
    }
}

export default AddItemForm;