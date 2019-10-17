import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import axios                from 'axios';

// bootstrap imports
import Carousel from 'react-bootstrap/Carousel';
import Spinner  from 'react-bootstrap/Spinner';
import Button   from 'react-bootstrap/Button';
import Modal    from 'react-bootstrap/Modal';
import Card     from 'react-bootstrap/Card';
import Row      from 'react-bootstrap/Row';
import Col      from 'react-bootstrap/Col';

// sweet alert import
import SweetAlert from 'react-bootstrap-sweetalert';

// custom components
import LikeButton from './LikeButton';

// redux stuff
import { connect } from 'react-redux';

// custom css
import '../../stylesheets/item.css'

export class ItemCard extends Component {

	state = {
		show              : false,
		scrolled_modal    : false,
		showWarning       : false,
		loading           : false,
		showDeleteSuccess : false
	}

	handleClose = () => {
		this.setState({ show: false });
	}

	handleShow = () => {
		this.setState({ show: true });
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
												console.log(res);
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

		const { item, user } = this.props;

		let btnContent;
		if (this.state.loading){
			btnContent = (<Spinner className="spinner" animation="border" size="md"/>);
		} else {
			btnContent = ("Yes, I'm sure");
		}

		let btnSet = null;
		if (user.type === 0){
			btnSet = (
						<Row>
							<Col
								lg="2">

								{/* delete button */}
								<Button
									variant="danger"
									onClick={this.handleDeleteRequest}
									className="del-btn btn"
									itemId={item.id}
									disabled={this.state.loading}>
									Delete
								</Button>
							</Col>

							<Col
								lg="10"
								className="d-flex justify-content-end">
								<Button
									className="btn"
									variant="light">
									View Interested
								</Button>
								<Button
									className="btn ml-2"
									variant="light">
									Assign Item
								</Button>
							</Col>
						</Row>
					)
		}

		return (

			<Card
				className="item-card item-card-loaded"
				style={{ width: "18.2rem" }}>

				<Card.Title
					className="item-card-title">
					{item.name}
				</Card.Title>

				<Card.Img
					className="item-card-img-top"
					variant="top"
					src={item.photos[item.cover]}/>

				<Row
					className="justify-content-end">
					<LikeButton
						itemID={item.id}
						size="sm"
						liked={item.intUsers.includes(user.id)}/>
				</Row>

				<Card.Body
					className="item-card-body">

				<Card.Text
					className="item-card-text">
					{ item.desc.length > 100
					? item.desc.substring(0, 100).trim() + "..."
					: item.desc}
				</Card.Text>

				<Button
					className="centered-btn btn"
					variant="light"
					size="sm"
					onClick={this.handleShow}>
						more info
				</Button>
				</Card.Body>

				<Modal
					size="xl"
					scrollable
					show={this.state.show}
					onHide={this.handleClose}
					centered
					ref={view_modal => (this.view_modal = view_modal)}>

					{/* item name */}
					<Modal.Header
						closeButton>
						<Modal.Title>
							{item.name}
						</Modal.Title>
					</Modal.Header>

					{/* item image carousel */}
					<Modal.Body
						className="info-modal-body px-5 pb-5 pt-0">

						<Carousel
							controls={false}>
							{item.photos.map((photo, index) => (
								<Carousel.Item
									key={index}>
									<img
										className="d-block w-100 img-fluid"
										src={photo}
										alt={item.name + "-img-" + index}
									/>
								</Carousel.Item>
							))}
						</Carousel>

						{/* animation to let user know that modal is scrollable*/}
						<div
							id="scroll-anim"
							className="d-flex justify-content-center"
							display={this.state.scrolled_modal ? "none" : "block"}>

							<div
								className="mouse-container">
								<div
									className="mouse">
									<span
										className="scroll-down">
									</span>
								</div>
							</div>
						</div>

						{/* item desciption */}
						<div
							className="item-row">
							<p
								className="my-5 text-justify">
								{item.desc}
							</p>
						</div>

						{ btnSet }

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
								onConfirm={() => this.handleDelete(item.id)}
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

					</Modal.Body>

				</Modal>

			</Card>
		);
	}
}

ItemCard.propTypes = {
    user: PropTypes.object.isRequired,
}

const mapStatesToProps = (state) => ({
	user : state.user,
});

export default connect(mapStatesToProps)(ItemCard);
