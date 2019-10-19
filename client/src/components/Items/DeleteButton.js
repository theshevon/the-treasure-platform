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

class DeleteButton extends Component {

	state = {
        showWarning       : false,
		showDeleteSuccess : false,
		loading           : false,
	}

    handleClose = () => {
        this.setState({ show: false });
    }
    
    handleDelete = async itemId => {
		// start the spinner animation
		this.setState({
			loading: true
		});

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

    cancelDelete = () => {
		this.setState({ showWarning: false });
	}

	handleDeleteRequest = () => {
		this.setState({ showWarning: true });
	}

	handleDeleteSuccess = () => {
		this.setState({ showWarning: false });
		this.setState({ showDeleteSuccess: true });
	}

	hideConrfimationAlert = () => {
		this.handleClose();
		window.location.reload();
	}

	render() {

        const { itemID } = this.props;

        /* determine onConfirm button content */
        let btnContent;
        if (this.state.loading){
            btnContent = (<Spinner className="spinner" animation="border" size="md"/>);
        } else {
            btnContent = ("Yes, I'm sure");
        }

        let sweetalerts = (
                <div>
                    {/* ask user to confirm item deletion */}
                    <SweetAlert
                        warning
                        showCancel
                        show={this.state.showWarning}
                        confirmBtnText={btnContent}
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="default"
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
                <Button
                    variant="danger"
                    onClick={this.handleDeleteRequest}
                    className="btn del-btn"
                    itemId={itemID}
                    disabled={this.state.loading}>
                    Delete
                </Button>
                {sweetalerts}
            </div>
		);
	}
}

export default DeleteButton;
