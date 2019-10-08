import React, { Component } from 'react'

// bootstrap imports
import Button from 'react-bootstrap/Button'
import Modal  from 'react-bootstrap/Modal'

export class FormModal extends Component {

    state = {
        show: false,
    }

    // handle modal close
    handleClose = () => {
		this.setState({ show : false })
	}

    // handle modal show
	handleShow = () => {
		this.setState({ show : true })
    }

    render() {
        return (
            <div>
                <Button
                    className="mt-2 mb-3 add-btn btn"
                    variant="light"
                    onClick={this.handleShow}>
                    { this.props.triggerBtnText }
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
                        <Modal.Title>
                            { this.props.title }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { this.props.form }
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}

export default FormModal
