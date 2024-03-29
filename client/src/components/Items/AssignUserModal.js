import React, { Component } from 'react'
import axios                from 'axios';

// bootstrap imports
import Spinner from 'react-bootstrap/Spinner';
import Button  from 'react-bootstrap/Button';
import Modal   from 'react-bootstrap/Modal';
import Form    from 'react-bootstrap/Form';

// semantic-ui imports
import { Dropdown } from 'semantic-ui-react';

// custom css
import '../../stylesheets/assign-user-modal.css';

/**
 * Represents a modal that will allow a Primary User to assign or re-assign
 * an item to a user.
 */
class AssignUserModal extends Component {

    state = {
        show       : false,
        loading    : false,
        current    : null,
        assignedTo : null,
        validated  : false,
        errors     : null,
        userOpts   : [],
        idsToNames : {}
    }

    async componentDidMount(){

        let { visibleTo, assignedTo } = this.props.item;

        await this.setState({ current : assignedTo });

        // retrieve the list of users who the item is visible to
        await axios({
                        method : 'get',
                        url    : '/users'
                    })
                    .then(res => {
                        let unfilteredUsers = res.data;

                        // remove all the users who the item isn't visible to
                        let users = [];
                        unfilteredUsers.forEach(user => {
                            if (visibleTo.includes(user.uid)){
                                users.push(user);
                            }
                        });

                        // mappings from user ids to their names
                        let idsToNames = {};

                        // user options for visibility dropdown
                        let userOptions = [];

                        users.forEach(user => {
                            userOptions.push({
                                key   : user.uid,
                                text  : user.name,
                                value : user.uid
                            });

                            idsToNames[user.uid] = user.name;
                        });

                        // allow for removal of assignment
                        userOptions.push({
                            key   : 0,
                            text  : "No One",
                            value : '0'
                        });

                        this.setState({
                                        loading    : false,
                                        userOpts   : userOptions,
                                        idsToNames : idsToNames
                                    });
                    })
                    .catch(err => {
                        console.log(err);
                    });
    }

    /**
     * Handles the closing of the modal.
     */
    handleClose = () => this.setState({ show : false });

    /**
     * Handles the opening of the modal.
     */
    handleShow = () => this.setState({ show : true });

    /**
     * Handles state updates to item assignee.
     */
    handleAssignment = (event, { value }) => {
        this.setState({ assignedTo : value });
    }

    /**
	 * Handles a new assignment by sending a request to the server to make the
	 * relevant updates to the item's `assignedTo` field.
	 */
    handleSubmit = event => {

        event.preventDefault();

        let iid        = this.props.item.id;
        let assignedTo = this.state.assignedTo;
        let current    = this.state.current;

        // same as current assignement so do nothing
        if (assignedTo === current || (assignedTo === '0' && current === '')){
            return;
        }

        this.setState({ loading : true });

        axios({
                method : 'put',
                url    : `/items/${iid}/assign/${assignedTo}`
            })
            .then(res => {
                this.setState({
                                current   : res.data,
                                loading   : false,
                                errors    : null
                            });
                this.props.item.assignedTo = res.data;
            })
            .catch(err => {
                this.setState({
                                loading   : false,
                                validated : true,
                                errors    : err.response.data
                            });
            });
    }

    render() {

        const { show, loading, validated, errors, current, idsToNames } = this.state;

        // backdrop for the modal
        let backdrop = null;
        if (show){
            backdrop = (
                            <div
                                className = "int-user-modal-backdrop fade modal-backdrop show">
                            </div>
                        );
        }

        // if loading, replace button text with spinner
        let btnContent = ("Confirm");
		if (loading){
			btnContent = (<Spinner animation="border" size="sm"/>);
        }

        // create label for the currently assigned user
        let labelContent = (<Spinner animation="border" size="sm"/>);
        if (current){
            labelContent = (idsToNames[current]);
        } else if (current === ''){
            labelContent = ("No One");
        }

        // -- check for errors
        let assignmentFeedback = null;
        if (validated){
            if (errors){
                assignmentFeedback = (
                    <p
                        className="invalid-feedback-msg">
                        { errors.msg }
                    </p>
                );
            }
        }

        return (

            <div>

                {/* trigger button */}
                <Button
                    className="btn m-1"
                    variant="light"
                    onClick = {this.handleShow}>
                    Assign
                </Button>

                { backdrop }

                <Modal
					size="sm"
					scrollable
					show={this.state.show}
					onHide={this.handleClose}
                    centered
                    className="assign-modal"
					ref={assign_modal => (this.assign_modal = assign_modal)}>

					<Modal.Header
						closeButton>

						<Modal.Title
                            className="sub-modal-title">
							Assign Successor
						</Modal.Title>

					</Modal.Header>

					<Modal.Body
						className="px-5 my-3 pt-0">

                        <p
                            className="current-assignee-label">
                            Currently assigned to:
                        </p>

                        {/* label with current successor's name */}
                        <p
                            className="assignee text-center">
                            { labelContent }
                        </p>

                        <Form>

                            {/* label for the dropdown */}
                            <Form.Label
                                className="text-center mr-1">
                                {this.props.assignedTo ? "Re-Assign to:" : "Assign to:"}
                            </Form.Label>

                            {/* dropdown to select new successor */}
                            <Dropdown
                                name="assignedto"
                                placeholder={ this.state.loadingUsers ? 'Loading...' : 'Select User' }
                                search
                                selection
                                scrollable
                                disabled={this.state.loadingUsers}
                                options={this.state.userOpts}
                                onChange={this.handleAssignment}/>
                                { assignmentFeedback }

                        </Form>

					</Modal.Body>

                    <Modal.Footer>

                        {/* submit button */}
                        <Button
                            className="assign-btn btn text-center"
                            variant="light"
                            onClick={this.handleSubmit}>
                            { btnContent }
                        </Button>

                    </Modal.Footer>

				</Modal>

            </div>
        )
    }
}

export default AssignUserModal
