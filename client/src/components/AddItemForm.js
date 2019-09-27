import React, { Component } from 'react'
import axios from 'axios'
import Multiselect from 'react-bootstrap-multiselect'

// bootstrap imports
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// semantic-ui imports
import { Dropdown } from 'semantic-ui-react'

// custom css
import '../stylesheets/add-item-form.css'

// stub data
import users from '../data/users'

class AddItemForm extends Component {

    state = {
        name              : null,
        desc              : null,
        coverImgIndex     : 0,
        uploadedFiles     : [],
        val               : null,
        visibleto         : [],
        assignedto        : null,
        stage             : 0,
        allUsers          : users,
        selectingWatchers : true,
        selectedUsers     : [],
        loading           : false,
        validated         : false
    }

    componentDidMount(){
        axios.get({
                        method: 'get',
                        url: 'http://localhost:5000/comp30022app/us-central1/api/users'
                    })
                    .then(res => {
                        this.setState({
                            allUsers: res.data
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    });
    }

    handleValidation = event => {

        const form = event.currentTarget;

        if (form.checkValidity()) {
            this.setState({ stage : 1 });
        } else {
            this.setState({ validated : true });
            event.preventDefault();
            event.stopPropagation();
        }
    }

    // handles changes made to input fields
    // when the value of an input field changes, its corresponding entry
    // in the state changes too
    handleChange = event => {
		this.setState({ [event.target.name] : event.target.value });
	}

    handleMultiSelect = (event, { values }) => {
        this.setState({ selectedUsers : values })
    }

    handleSubmit = event => {

		event.preventDefault();

		this.setState({
			loading: true
		});

		const itemData = {
            name       : this.state.name,
            desc       : this.state.desc,
            cover      : this.state.coverImgIndex,
            photos     : this.state.uploadedFiles,
            val        : this.state.val,
            visibleto  : this.state.selectedUsers,
            assignedto : this.state.assignedto
		}

		axios({
				method: 'post',
				url: 'http://localhost:5000/comp30022app/us-central1/api/items',
				data: itemData
			})
			.then(res => {
				this.setState({ loading : false });
				this.props.history.push('/items');
			})
			.catch(err => {
				this.setState({
                    errors    : err.response.data,
                    stage     : 0,
					loading   : false,
					validated : true
				})
			})
	}

    handleFileSelect = event => {
        if (this.state.uploadedFiles.length === 0){
            this.setState({ uploadedFiles : Array.from(event.target.files) });
        } else {
            this.setState({ uploadedFiles : [] });
        }
    }

    handleVisibilityOptionChange = () => {

        if (this.state.selectingWatchers){
            this.setState({selectingWatchers : false});
        } else {
            this.setState({selectingWatchers : true});
        }
    }

    handleAssignment = (event, { value }) => {
        this.setState({ assignedto: value });
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

    render() {

        let photoSelectText;
        let noUploaded = this.state.uploadedFiles.length;
        if (noUploaded == 0){
            photoSelectText = "Select Photos";
        } else {
            photoSelectText = noUploaded + " photos selected";
        }

        // if loading, replace button text with spinner
        let loginBtnContent;
		if (this.state.loading){
			loginBtnContent = (<Spinner animation="border" size="sm"/>);
		} else {
			loginBtnContent = ("Log In");
        }

        let userOptions = [];
        this.state.allUsers.forEach(user => {
            userOptions.push({
                key: user.uid,
                text: user.name,
                value: user.name
            })
        })

        let opts = ["Visible to", "Hidden from"];
        let visibilityOptions = opts.map(item => ({
                                                    key: item,
                                                    text: item,
                                                    value: item
                                                }));

        return (
            <div>

                <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={this.handleValidation}>
                    {/* Item name input field */}
                    <Form.Group
                        as={Row}
                        className={this.state.stage ===  0 ? "" : "hidden-field"}>
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
                                required
                                onChange={this.handleChange}/>
                            <Form.Control.Feedback type="invalid">
                                Please enter a name for the item.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    {/* Item description field */}
                    <Form.Group
                        as={Row}
                        className={this.state.stage ===  0 ? "" : "hidden-field"}>
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
                                required
                                onChange={this.handleChange}/>
                            <Form.Control.Feedback type="invalid">
                                Please enter a description of the item.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    {/* Item value field */}
                    <Form.Group
                        as={Row}
                        className={this.state.stage ===  0 ? "" : "hidden-field"}>
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
                                onChange={this.handleChange}
                                className="optional-field"/>
                            <Form.Control.Feedback type="invalid">
                                {/* Error message for item value */}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    {/* Item visibility field */}
                    <Form.Group
                        as={Row}
                        className={this.state.stage ===  0 ? "" : "hidden-field"}>
                        <Col
                            sm="3"
                            className="px-1">
                            <Dropdown
                                selection
                                options={visibilityOptions}
                                onChange={this.handleVisibilityOptionChange}/>
                        </Col>
                        <Col
                            sm="9">
                            <Dropdown
                                onChange={this.handleMultiSelect}
                                placeholder='Select User(s)'
                                fluid
                                multiple
                                selection
                                options={userOptions} />
                            <Form.Text
                                className="text-muted">
                                If no users are selected, this item will be visible to everyone.
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className={this.state.stage ===  0 ? "" : "hidden-field"}>
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
                            <Dropdown
                                name="assignedto"
                                placeholder='Select User(s)'
                                search
                                selection
                                options={userOptions}
                                onChange={this.handleAssignment}/>
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className={this.state.stage ===  0 ? "" : "hidden-field"}>
                        <Form.Label
                            column
                            sm="3">
                            Photos
                        </Form.Label>
                        <Col
                            sm="9">
                            <Form.Control
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
                                    {photoSelectText}
                            </Button>
                            <Form.Control.Feedback type="invalid">
                                Please upload at least one photo.
                            </Form.Control.Feedback>

                        </Col>
                    </Form.Group>

                    <Button
                        variant="light"
                        type="submit"
                        className={this.state.stage ===  0 ? "float-right btn" : "hidden-field"}>
                        Next
                    </Button>

                    <Row
                        className={this.state.stage ===  1 ? "" : "hidden-field"}>

                        { this.state.uploadedFiles.map((file, index) => (
                            <Col
                                key={index}
                                xs={12} md={4}
                                onClick={this.handleImgSelect.bind(this, index)}
                                className={ index === this.state.coverImgIndex? "selected-img m-1" : "non-selected-img m-1"}>
                                <img
                                    src={ URL.createObjectURL(file) }
                                    className={ "img-fluid" }
                                ></img>
                            </Col>
                        ))}
                    </Row>

                    <Button
                        type="button"
                        variant="light"
                        onClick={this.handleReturn}
                        className={this.state.stage ===  1 ? "" : "hidden-field"}>
                        Back
                    </Button>

                    <Button
                        variant="light"
                        type="submit"
                        onClick={this.handleSubmit}
                        className={this.state.stage ===  1 ? "float-right btn" : "hidden-field"}>
                        {loginBtnContent}
                    </Button>
                </Form>
            </div>
        )
    }
}

export default AddItemForm;