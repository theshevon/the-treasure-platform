import React, { Component } from 'react'
import axios from 'axios'

// bootstrap imports
import Spinner from 'react-bootstrap/Spinner'
import Button  from 'react-bootstrap/Button'
import Form    from 'react-bootstrap/Form'
import Row     from 'react-bootstrap/Row'
import Col     from 'react-bootstrap/Col'

// semantic-ui imports
import { Dropdown } from 'semantic-ui-react'

// custom css
import '../stylesheets/add-item-form.css'

// stub data
// import users from '../data/users'

class AddItemForm extends Component {

    state = {
        name              : null,
        desc              : null,
        coverImgIndex     : 0,
        uploadedFiles     : [],
        assignedto        : null,
        stage             : 0,
        allUsers          : [],
        selectingWatchers : true,
        selectedUsers     : [],
        loading           : false,
        validated         : false
    }

    componentDidMount(){

        // fetch user IDs and names of all the secondary users on the platform
        axios({
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

        // user options for visibility dropdown
        let userOptions = [];
        this.state.allUsers.forEach(user => {
            userOptions.push({
                key: user.uid,
                text: user.name,
                value: user.name
            });
        });
        this.setState({ userOptions : userOptions });

        // options for visibility toggler dropdown
        let opts = ["Visible to", "Hidden from"];
        let visibilityOptions = opts.map(item => ({
                                                    key: item,
                                                    text: item,
                                                    value: item
                                                }));
        this.setState({ visibilityOptions : visibilityOptions });
    }

    // handles validation of the input fields in the form
    handleValidation = event => {

        const form = event.currentTarget;

        if (form.checkValidity()) {
            this.setState({ stage : 1 });
        } else {
            this.setState({ validated : true });
        }

        event.preventDefault();
        event.stopPropagation();
    }

    // handles changes made to input fields
    // when the value of an input field changes, its corresponding entry
    // in the state changes too
    handleChange = event => {
		this.setState({ [event.target.name] : event.target.value });
	}

    // handles state updates to item visibility changes
    handleMultiSelect = (event, { value }) => {
        this.setState({ selectedUsers : value })
    }

    // handles state updates for errors during submission
    handleErrors = err => {
        this.setState({
            errors    : err,
            stage     : 0,
            loading   : false,
            validated : true
        })
    }

    handleCreate = async (data) => {
        console.log("item create started");
        let id = await axios({
                                method: 'post',
                                url: 'http://localhost:5000/comp30022app/us-central1/api/items/new',
                                data: data
                            })
                            .then(res => {
                                return res.data();
                            })
                            .catch(err => {
                                this.handleErrors(err);
                            })
        console.log("item create ended");
        return id;
    }

    // handleCreate = async (data) => {
    //     return await axios({
    //                         method: 'post',
    //                         url: 'http://localhost:5000/comp30022app/us-central1/api/items/new',
    //                         data: data
    //                         })
    //                         .then(res => {
    //                             return res.data();
    //                         })
    //                         .catch(err => {
    //                             throw err;
    //                         });
    // }

    handleUpload = async (fd, itemId) => {
        console.log("start");
        let response = await axios({
                        method: 'post',
                        url: `http://localhost:5000/comp30022app/us-central1/api/items/${itemId}/img_upload`,
                        headers: {
                            'content-type': 'multipart/form-data'
                        },
                        data: fd
                    })
                    .then(res => {
                        return res;
                    })
                    .catch(err => {

                        // if there is an error, delete the item
                        axios({
                                method: 'delete',
                                url: `http://localhost:5000/comp30022app/us-central1/api/items/${itemId}`
                            })
                            .catch(err => {
                                this.handleErrors(err.response.data);
                            })

                        this.handleErrors(err.response.data);
                    });
        console.log("finish");
        return response;
    }

    // prepares and sends the data to the server to create a new item
    handleSubmit = event => {

		event.preventDefault();

		this.setState({
			loading: true
        });

        // create an array with just the ids of the users who the item will
        // be visible to
        let visibleTo = [];
        if (this.state.selectingWatchers){
            this.state.allUsers.forEach(user => {
                if (this.state.selectedUsers.includes(user.name)){
                    visibleTo.push(user.uid);
                }
            });
        } else {
            this.state.allUsers.forEach(user => {
                if (!this.state.selectedUsers.includes(user.name)){
                    visibleTo.push(user.uid);
                }
            });
        }

        // replace assignedto with the uid of the corresponding user
        let assignedTo = '';
        for (let i=0; i<this.state.allUsers.length; i++){
            let user = this.state.allUsers[i];
            if (user.name === this.state.assignedto){
                assignedTo = user.uid;
                break;
            }
        }

        // data needed to make an item on firebase
		const itemData = {
            name       : this.state.name,
            desc       : this.state.desc,
            cover      : this.state.coverImgIndex,
            visibleTo  : visibleTo,
            assignedTo : assignedTo,
            photos     : []
        }

        // create a new item using the data
        let itemId = this.handleCreate(itemData);

        // upload the photos
        if (!this.state.errors){
            for (let i=0; i < this.state.uploadedFiles.length; i++) {
                let file = this.state.uploadedFiles[i];
                let fd = new FormData();
                fd.append('file', file, file.name);

                // send each file as its own upload request
                // send the data to the server
                await this.handleUpload(fd, itemId);

                if (this.state.errors) break;
            }
        }

        // submission was successful
        if (!this.state.errors){
            this.setState({ loading : false });

            // go back to items page
            // this.props.history.push('/items');
        }
	}

    // handles state updates to uploaded files
    handleFileSelect = event => {
        this.setState({ uploadedFiles : Array.from(event.target.files) });
    }

    // handles state updates to visibility toggler
    handleVisibilityOptionChange = () => {

        if (this.state.selectingWatchers){
            this.setState({selectingWatchers : false});
        } else {
            this.setState({selectingWatchers : true});
        }
        this.setState({ selectedUsers : [] });
        this.visDropdown.setState({ value : [] });
    }

    // handles state updates to item assignee
    handleAssignment = (event, { value }) => {
        this.setState({ assignedto: value });
    }

    // handles state updates to cover image selection
    handleImgSelect = (index) => {
        this.setState({ coverImgIndex : index });
    }

    // handles state updates to form navigation
    handleReturn = () => {
        this.setState({
                        stage: 0,
                        validated: false
                      });

    }

    render() {

        // decide on what text needs to be on the photo upload button
        let photoSelectText;
        let noUploaded = this.state.uploadedFiles.length;
        if (noUploaded === 0){
            photoSelectText = "Select Photos";
        } else if (noUploaded === 1){
            photoSelectText = noUploaded + " photo selected";
        } else {
            photoSelectText = noUploaded + " photos selected";
        }

        // if loading, replace button text with a spinner
        let btnContent;
		if (this.state.loading){
			btnContent = (<Spinner animation="border" size="sm"/>);
		} else {
			btnContent = ("Add Item");
        }

        return (
            <div>

                <Form
                    noValidate
                    encType="multipart/form-data"
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

                    {/* Item visibility field */}
                    <Form.Group
                        as={Row}
                        className={this.state.stage ===  0 ? "" : "hidden-field"}>
                        <Col
                            sm="3"
                            className="px-1">
                            <Dropdown
                                selection
                                defaultValue="Visible to"
                                options={this.state.visibilityOptions}
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
                                defaultValue={this.state.selectedUsers}
                                ref={visDropdown => this.visDropdown = visDropdown}
                                options={this.state.userOptions} />
                            <Form.Text
                                className="text-muted">
                                If no users are selected, this item will be visible to everyone.
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    {/* Item assignment field */}
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
                                options={this.state.userOptions}
                                onChange={this.handleAssignment}/>
                        </Col>
                    </Form.Group>

                    {/* Item photo field */}
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
                </Form>

                {/* Uploaded image preview */}
                <Row
                    className={this.state.stage ===  1 ? "d-flex justify-content-center" : "hidden-field"}>
                    <span>
                        Please select a cover image for the item
                    </span>
                </Row>
                <Row
                    className={this.state.stage ===  1 ? "px-1 py-4" : "hidden-field"}>

                    { this.state.uploadedFiles.map((file, index) => (
                        <Col
                            key={index}
                            xs={12} md={3}
                            onClick={this.handleImgSelect.bind(this, index)}
                            className={ index === this.state.coverImgIndex? "selected-img" : "non-selected-img"}>
                            <img
                                src={ URL.createObjectURL(file) }
                                className={ "img-fluid" }
                                alt={"img-" + index}
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
                    onClick={this.handleSubmit}
                    className={this.state.stage ===  1 ? "float-right btn" : "hidden-field"}
                    disabled={this.state.loading}>
                    {btnContent}
                </Button>

            </div>
        )
    }
}

export default AddItemForm;