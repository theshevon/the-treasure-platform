import React, { Component } from 'react'

// bootstrap imports
import Button from 'react-bootstrap/Button'
import Modal  from 'react-bootstrap/Modal'

// custom components
import AddItemForm from './AddItemForm'

class AddItemModal extends Component {

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
                    Add Item
                </Button>

                <Modal
                    className="add-item-modal"
                    show={this.state.show}
                    size="lg"
                    onHide={this.handleClose}
                    centered
                    scrollable>
                    <Modal.Header
                        closeButton>
                        <Modal.Title>Add A New Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddItemForm />
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default AddItemModal
