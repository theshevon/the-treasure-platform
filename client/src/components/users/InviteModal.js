import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InviteFrom from './InviteForm'
import '../../stylesheets/invite-modal.css'


class InviteModal extends Component {

    state = {
        show : false
    }

    handleClose = () => this.setState({ show : false });
    handleShow = () => this.setState({ show : true });

    render() {

        return (
            <div>

                <Button variant="primary" onClick={this.handleShow}>
                    + Users
                </Button>

                <Modal
                    className="invite-user-modal"
                    size="lg"
                    scrollable
                    centered
                    show={this.state.show}
                    onHide={this.handleClose}>
                    <Modal.Header closeButton>
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
