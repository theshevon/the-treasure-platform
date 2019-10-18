import React, { Component } from 'react'
import axios                from 'axios';

// bootstrap imports
import Spinner from 'react-bootstrap/Spinner';
import Button  from 'react-bootstrap/Button';
import Modal   from 'react-bootstrap/Modal';
import Form    from 'react-bootstrap/Form';
import Row     from 'react-bootstrap/Row';
import Col     from 'react-bootstrap/Col';

// semantic-ui imports
import { Dropdown } from 'semantic-ui-react';

// custom css
import '../../stylesheets/assign-user-modal.css';

export class AssignUserModal extends Component {

    state = {
        show       : false,
        loading    : true,
        assignedTo : null
    }

    handleClose = () => this.setState({ show : false });

    handleShow = () => this.setState({ show : true });

     // handles state updates to item assignee
    handleAssignment = (event, { value }) => {
        this.setState({ assignedto: value });
    }

    render() {

        let backdrop = null;
        if (this.state.show){
            backdrop = (
                            <div
                                className = "int-user-modal-backdrop fade modal-backdrop show">
                            </div>
                        );
        }

        return (

            <div>

                {/* Assign button */}
                <Button
                    className="btn"
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

                        <p
                            className="assignee text-center">
                            {this.props.assignedTo || 'No One'}
                        </p>

                        <Form>
                            <Form.Label
                                className="text-center">
                                {this.props.assignedTo ? "Re-Assign to:" : "Assign to:"}
                            </Form.Label>

                            <Dropdown
                                name="assignedto"
                                placeholder={ this.state.loadingUsers ? 'Loading...' : 'Select User' }
                                search
                                selection
                                disabled={this.state.loadingUsers}
                                options={this.state.userOptions}
                                onChange={this.handleAssignment}/>
                        </Form>
					</Modal.Body>

                    <Modal.Footer>
                        <Button
                            className="btn text-center"
                            variant="light">
                            Confirm
                        </Button>
                    </Modal.Footer>

				</Modal>

            </div>
        )
    }
}

export default AssignUserModal
