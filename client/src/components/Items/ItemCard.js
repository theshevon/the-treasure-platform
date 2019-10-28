import React, { Component } from 'react';
import PropTypes            from 'prop-types';

// bootstrap imports
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Carousel       from 'react-bootstrap/Carousel';
import Tooltip        from 'react-bootstrap/Tooltip';
import Button         from 'react-bootstrap/Button';
import Modal          from 'react-bootstrap/Modal';
import Card           from 'react-bootstrap/Card';
import Row            from 'react-bootstrap/Row';
import Col            from 'react-bootstrap/Col';

// custom components
import ViewInterestedModal from './ViewInterestedModal';
import AssignUserModal     from './AssignUserModal';
import DeleteButton 	   from './DeleteButton';
import LikeButton          from './LikeButton';

// redux stuff
import { connect } from 'react-redux';

// custom css
import '../../stylesheets/item.css';

// icons
import star from '../../icons/star.svg';

export class ItemCard extends Component {

	state = {
		show              : false,
		scrolled_modal    : false,
		loading           : false,
	}

	handleClose = () => {
		this.setState({ show: false });
	}

	handleShow = () => {
		this.setState({ show: true });
	}

	render() {

		const { item, user } = this.props;

		/* define the EOI button and assigned icon */

		let EOIOpt = 	(
							<Row
								className={item.assignedTo === user.id ? "justify-content-between align-items-center" : "justify-content-end"}>
								<OverlayTrigger
									placement="top"
									overlay={
												<Tooltip>
												This item has been assigned to you.
												</Tooltip>
											}>
									<img
										className={item.assignedTo === user.id ? "assigned-icon" : "d-none"}
										src={star}
										width="25"
										height="25"
										alt="assigned_icon"/>
								</OverlayTrigger>
								<LikeButton
									itemID={item.id}
									size="sm"
									liked={item.intUsers.includes(user.id)}/>
							</Row>
						);


		/* establish user type i.e. secondary or primary user */
		let type   = localStorage.TreasureUType || user.type;
		if (typeof type === "string"){
			type = parseInt(type);
		}

		/* determine which buttons to show based on user type */
		let btnSet = null;
		if (type === 0){
			btnSet = (
						<div className="item-row">
							<container className="modal-btn-set">

								{/* view-interested button */}
								<div className="right-btns">
									<ViewInterestedModal
										intUserIDs={ item.intUsers } />
								</div>

								{/* assign button */}
								<div className="right-btns">
									<AssignUserModal
										item = { item } />
								</div>

								{/* delete button */}
								<div>
									<DeleteButton
										itemID    ={ item.id }/>
								</div>
							</container>
						</div>
					)

			/* disable EOI option for primary users */
			EOIOpt = null;
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

				{ EOIOpt }

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
					id="item-modal"
					size="xl"
					scrollable
					show={this.state.show}
					backdrop
					onHide={this.handleClose}
					centered
					ref={view_modal => (this.view_modal = view_modal)}>

					{/* item name */}
					<Modal.Header
						closeButton>
					</Modal.Header>

					<Modal.Body
						className="info-modal-body px-md-5 pb-md-5 pt-0">
						<Row>
							{/* item image carousel */}
							<Col sm="6">
								<Carousel
									controls={item.photos.length> 1 ? true : false }
									indicators = {false}>
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
							</Col>

							<Col sm="6">
								{/* item desciption */}
								<div className = "modal-title item-modal-title">
									{item.name}
								</div>
								<div
									className="item-row item-desc">
									<p className="my-5 text-justify">
										{item.desc}
									</p>
								</div>
								{ btnSet }
							</Col>
						</Row>

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
