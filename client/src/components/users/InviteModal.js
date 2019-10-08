import React, { Component } from 'react'

// bootstrap imports
import Button from 'react-bootstrap/Button'
import Modal  from 'react-bootstrap/Modal'

// custom components
import InviteFrom from './users/InviteForm'

// custom stylesheets
import '../stylesheets/invite-modal.css'

class InviteModal extends Component {

    state = {
        show : false
    }

    handleClose = () => this.setState({ show : false });
    handleShow = () => this.setState({ show : true });

    render() {

        return (
            <div>

                <Button
                    className="mt-2 mb-3 add-btn btn"
                    variant="light"
                    onClick={this.handleShow}>
                    Invite Users
                </Button>

                <Modal
                    className="invite-user-modal"
                    size="lg"
                    scrollable
                    centered
                    show={this.state.show}
                    onHide={this.handleClose}>
                    <Modal.Header
                        closeButton>
                        <Modal.Title>Invite Users</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InviteFrom/>
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}

export default InviteModal
