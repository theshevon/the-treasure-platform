// react imports
import React, { Component } from 'react';
import axios                from 'axios';

// bootstrap imports
import Spinner  from 'react-bootstrap/Spinner';
import Button   from 'react-bootstrap/Button';

// sweet alert imports
import SweetAlert from 'react-bootstrap-sweetalert';

// custom css
import '../../stylesheets/item.css';

/**
 * A 'Delete' button that triggers an 'Are You Sure?' warning alert.
 * If delete request is confirmed and successfully executed,
 * a 'Success' alert is displayed.
 */
class DeleteButton extends Component {

	state = {
        showWarning       : false,
		showDeleteSuccess : false,
		loading           : false,
	}

	/**
	 * Closes the warning alert
	 */
    handleClose = () => {
        this.setState({ show: false });
    }

	/**
	 * Sends a delete request to the backend and displays loading animation
	 */
    handleDelete = async itemId => {

		// start the spinner animation
		this.setState({
			loading: true
		});

		// sends delete request
		try {
			const url = `/items/${itemId}`;
			const res = await axios
									.delete(url)
									.then(res => {
												return res.data;
										});
			this.handleDeleteSuccess();
			return res;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * closes the warning alert without deleting the item
	 */
    cancelDelete = () => {
		this.setState({ showWarning: false });
	}

	/**
	 * asks user for confirmation to delete
	 */
	handleDeleteRequest = () => {
		this.setState({ showWarning: true });
	}

	/**
	 * displays 'success alert' upon successful deletion
	 */
	handleDeleteSuccess = () => {
		this.setState({ showWarning: false });
		this.setState({ showDeleteSuccess: true });
	}

	/**
	 * closes the 'confirmation alert'
	 */
	hideConrfimationAlert = () => {
		this.handleClose();
		window.location.reload();
	}

	render() {

        const { itemID } = this.props;

        /* determine onConfirm button content, either words or loading spinner */
        let btnContent;
        if (this.state.loading){
            btnContent = (<Spinner className="spinner" animation="border" size="md"/>);
        } else {
            btnContent = ("Yes, I'm sure");
        }

        let alerts = (
                <div>

                    {/* ask user to confirm item deletion */}
                    <SweetAlert
                        warning
                        showCancel
                        show={this.state.showWarning}
                        confirmBtnText={btnContent}
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="light"
                        title="STOP!"
                        onConfirm={() => this.handleDelete(itemID)}
                        onCancel={this.cancelDelete}>
                        Are you sure you want to delete this item?
                    </SweetAlert>

                    {/* successful deletion notification */}
                    <SweetAlert
                        success
                        title="Done!"
                        show={this.state.showDeleteSuccess}
                        onConfirm={this.hideConrfimationAlert}>
                        The item was successfully deleted!
                    </SweetAlert>
                </div>
			)

		return (
            <div>

				{/* delete button */}
                <Button
                    variant="danger"
                    onClick={this.handleDeleteRequest}
                    className="btn del-btn"
                    itemId={itemID}
                    disabled={this.state.loading}>
                    Delete
                </Button>

				{/* alerts triggered according to user choices */}
                {alerts}

            </div>
		);
	}
}

export default DeleteButton;
