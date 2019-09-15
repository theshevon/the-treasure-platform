import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InviteFrom from './InviteForm'
import './InviteModal.css'


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

                <Modal size="lg" scrollable="true" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Invite Users</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InviteFrom type="email"/>
                        <p> Add another </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={this.handleClose}>
                            Send Invitations
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

export default InviteModal
