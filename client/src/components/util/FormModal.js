import React, { Component } from 'react';

// bootstrap imports
import Button from 'react-bootstrap/Button';
import Modal  from 'react-bootstrap/Modal';

/**
 * Represents a Modal that encapsulates a Form that needs to be filled out
 * by a user.
 */
class FormModal extends Component {

    state = {
        show: false,
    }

    /**
     * Handles the closing of the modal.
     */
    handleClose = () => {
		this.setState({ show : false })
	}

    /**
     * Handles the opening of the modal.
     */
	handleShow = () => {
		this.setState({ show : true })
    }

    render() {

        return (
            <div>

                {/* trigger button for the modal */}
                <Button
                    className="mt-2 mb-3 centered-btn btn"
                    variant="light"
                    onClick={this.handleShow}>
                    { this.props.triggerBtnText }
                </Button>

                {/* actual modal */}
                <Modal
                    className="invite-user-modal"
                    size={ this.props.modalSize }
                    scrollable
                    centered
                    show={this.state.show}
                    onHide={this.handleClose}>

                    <Modal.Header
                        closeButton>
                        <Modal.Title>
                            { this.props.title }
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {/* pass in the handleClose function so that it will be accessible by the child elements */}
                        { React.cloneElement(this.props.form, { handleClose : this.handleClose }) }
                    </Modal.Body>

                </Modal>

            </div>
        )
    }
}

export default FormModal
