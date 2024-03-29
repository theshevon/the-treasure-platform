import React, { Component } from 'react';
import axios                from 'axios';

// bootstrap imports
import Spinner from 'react-bootstrap/Spinner';
import Button  from 'react-bootstrap/Button';
import Form    from 'react-bootstrap/Form';
import Row     from 'react-bootstrap/Row';
import Col     from 'react-bootstrap/Col';

// semantic-ui imports
import { Dropdown } from 'semantic-ui-react';

// custom css
import '../../stylesheets/add-item-form.css';

class AddItemForm extends Component {

    state = {
        name              : null,
        desc              : null,
        coverImgIndex     : 0,
        uploadedFiles     : [],
        assignedTo        : null,
        stage             : 0,
        allUsers          : [],
        userOptions       : [],
        visibilityOptions : [],
        selectingWatchers : true,
        selectedUsers     : [],
        loading           : false,
        loadingUsers      : true,
        validated         : false,
        success           : false
    }

    async componentDidMount(){

        // options for visibility toggler dropdown
        let opts = ["Visible to", "Hidden from"];
        let visibilityOptions = opts.map(opt => ({
                                                    key   : opt,
                                                    text  : opt,
                                                    value : opt
                                                }));

        this.setState({ visibilityOptions : visibilityOptions });

        // fetch user IDs and names of all the secondary users on the platform
        await axios({
                    method: 'get',
                    url: '/users'
                })
                .then(res => {
                    let users = res.data;

                    // user options for visibility dropdown
                    let userOptions  = [];
                    let userOptions2 = [];
                    users.forEach(user => {
                        userOptions.push({
                            key   : user.uid,
                            text  : user.name,
                            value : user.name
                        });
                        userOptions2.push({
                            key   : user.uid,
                            text  : user.name,
                            value : user.name
                        });
                    });

                    // allow the user to revert to 'unassigned' selection
                    userOptions2.push({
                        key   : 0,
                        text  : "No One",
                        value : null
                    });

                    this.setState({
                        allUsers     : users,
                        userOptions  : userOptions,
                        userOptions2 : userOptions2,
                        loadingUsers : false
                    });
                })
                .catch(err => {
                    console.log(err);
                });
    }

    /**
     * Handles validation of the input fields in the form.
     */
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

    /**
     * Handles changes made to input fields.
     * When the value of an input field changes, its corresponding entry in the
     * state changes too.
     */
    handleChange = event => {
		this.setState({ [event.target.name] : event.target.value });
	}

    /**
     * Handles state updates to item visibility changes.
     */
    handleMultiSelect = (event, { value }) => {
        this.setState({ selectedUsers : value })
    }

    /**
     * Handles state updates for errors during submission.
     */
    handleErrors = err => {
        this.setState({
            errors    : err,
            stage     : 0,
            loading   : false,
            validated : true
        })
    }

    /**
     * Sends textual data needed to create an item to the server.
     */
    handleCreate = async data => {
        try {
            const res = await axios({
                method: "post",
                url: '/items/new',
                data: data
            }).then((res)=> {
                return res.data;
            })
            return res;
        } catch (err) {
            throw err;
        }
    };

    /**
     * Sends an image to the server to be stored and linked with the item
     * being created.
     */
    handleUpload = async (fd, itemId) => {
        try {
            await axios({
                            method: "post",
                            url: `/items/${itemId}/img_upload`,
                            headers: {
                                "content-type": "multipart/form-data"
                            },
                            data: fd

                        })
            return;
        } catch (err) {
            throw err.response.data;
        }
    }

    /**
     * Prepares the data to be sent to the server to create a new item.
     */
    handleSubmit = event => {

		event.preventDefault();

		this.setState({
			loading: true
        });

        // create an array with just the ids of the users who the item will
        // be visible to
        let visibleTo = [];

        // if no users will selected, the item is visible to all users
        if (this.state.selectedUsers.length === 0){
            this.state.allUsers.forEach(user => {
                visibleTo.push(user.uid);
            });
        } else {
            // else, decide which users to show the item to
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
        }

        // replace assignedTo with the uid of the corresponding user
        let assignedTo = '';
        for (let i=0; i<this.state.allUsers.length; i++){
            let user = this.state.allUsers[i];
            if (user.name === this.state.assignedTo){
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
        }

        this.submitData(itemData);
	}

    /**
     * Sends the data to the server to create a new item.
     */
    submitData = async itemData => {
        try {
            // create a new item using the data
            const itemId = await this.handleCreate(itemData);

            for (let i = 0; i < this.state.uploadedFiles.length; i++) {
                const file = this.state.uploadedFiles[i];
                let fd = new FormData();
                fd.append("file", file, file.name);
                // send each file as its own upload request
                await this.handleUpload(fd, itemId);
            }
        } catch(err) {
            this.handleErrors(err);

            // TODO: if an image upload failed, then delete the item and provide
            // an appropriate response to the user.
        }

        this.props.handleAlert("Successfully created a new item!");
        this.props.handleClose();
    }

    /**
     * Handles state updates to uploaded files.
     */
    handleFileSelect = async event => {
        await this.setState({ uploadedFiles : Array.from(event.target.files) });
    }

    /**
     * Handles state updates to visibility toggler.
     */
    handleVisibilityOptionChange = () => {

        if (this.state.selectingWatchers){
            this.setState({ selectingWatchers : false });
        } else {
            this.setState({ selectingWatchers : true });
        }
        this.setState({ selectedUsers : [] });
        this.visDropdown.setState({ value : [] });
    }

    /**
     * Handles state updates to item assignee.
     */
    handleAssignment = (event, { value }) => {
        this.setState({ assignedTo: value });
    }

    /**
     * Handles state updates to cover image selection.
     */
    handleImgSelect = (index) => {
        this.setState({ coverImgIndex : index });
    }

    /**
     * Handles state updates to form navigation.
     */
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

                    {/* item name input field */}
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

                    {/* item description field */}
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

                    {/* item visibility field */}
                    <Form.Group
                        as={Row}
                        className={this.state.stage ===  0 ? "" : "hidden-field"}>

                        <Col
                            sm="3"
                            className="px-md-1 px-sm-3">
                            <Dropdown
                                id="visibility_toggler"
                                selection
                                disabled={this.state.loadingUsers}
                                defaultValue="Visible to"
                                options={this.state.visibilityOptions}
                                onChange={this.handleVisibilityOptionChange}/>
                        </Col>

                        <Col
                            sm="9">
                            <Dropdown
                                id="visibility_selector"
                                onChange={this.handleMultiSelect}
                                placeholder={ this.state.loadingUsers ? 'Loading...' : 'Select User(s)' }
                                fluid
                                multiple
                                selection
                                disabled={this.state.loadingUsers}
                                defaultValue={this.state.selectedUsers}
                                ref={visDropdown => this.visDropdown = visDropdown}
                                options={this.state.userOptions}/>
                            <Form.Text
                                className="text-muted">
                                If no users are selected, this item will be visible to everyone.
                            </Form.Text>
                        </Col>

                    </Form.Group>

                    {/* item assignment field */}
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
                                id="assignment_selector"
                                name="assignedTo"
                                placeholder={ this.state.loadingUsers ? 'Loading...' : 'Select User' }
                                search
                                selection
                                disabled={this.state.loadingUsers}
                                options={this.state.userOptions2}
                                onChange={this.handleAssignment}/>
                            <Form.Text
                                className="text-muted">
                                Select 'No One' to remove an assignment.
                            </Form.Text>
                        </Col>

                    </Form.Group>

                    {/* item photo upload field */}
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

                    {/* `next` button */}
                    <Button
                        variant="light"
                        type="submit"
                        className={this.state.stage ===  0 ? "float-right btn" : "hidden-field"}>
                        Next
                    </Button>
                </Form>

                {/* uploaded image previews */}
                <Row
                    className={this.state.stage ===  1 ? "d-flex justify-content-center" : "hidden-field"}>
                    <span>
                        Please select a cover image for the item
                    </span>
                </Row>
                <Row
                    className={this.state.stage ===  1 ? "px-3 py-4" : "hidden-field"}>

                    { this.state.uploadedFiles.map((file, index) => (
                        <Col
                            key={index}
                            xs={12} md={4}
                            onClick={this.handleImgSelect.bind(this, index)}
                            className={ index === this.state.coverImgIndex? "selected-img" : "non-selected-img"}>
                            <img
                                src={ URL.createObjectURL(file) }
                                className="uploaded-img img-fluid"
                                alt={"img-" + index}>
                            </img>
                        </Col>
                    ))}
                </Row>

                {/* `back` button */}
                <Button
                    type="button"
                    variant="light"
                    onClick={this.handleReturn}
                    className={this.state.stage ===  1 ? "" : "hidden-field"}>
                    Back
                </Button>

                {/* `submit` button */}
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
