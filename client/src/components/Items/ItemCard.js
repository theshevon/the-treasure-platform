import React, {Component} from 'react'
// import ReactDOM from 'react-dom'

// bootstrap imports
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// custom css
import '../../stylesheets/item.css'

export class ItemCard extends Component {

	state = {
		show : false,
		scrolled_modal: false,
    }

    handleClose = () => {
		this.setState({ show : false })
	};

	handleShow = () => {
		this.setState({ show : true })
	};

	// TO DO: remove mouse down animation when modal has been scrolled
    // componentDidMount() {
	// 	if (this.state.show){
	// 		let view_modal = ReactDOM.findDOMNode(this.view_modal);
	// 		console.log(view_modal.scrollY);
	// 		view_modal.addEventListener('scroll', () => {
	// 			const scrolled = this.scrollY > 50;
	// 			console.log(this.view_modal.scrollY);
	// 			if (scrolled !== this.state.scrolled_modal) {
	// 				this.setState({ scrolled_modal: scrolled });
	// 			}
	// 		});
	// 	}
    // }

    render() {

		const { item } = this.props;

        return (

				<Card
					className="item-card">

					<Row>

						<Col
							sm={6}
							className="pb-0">
							<Card.Img
								className="item-card-img-top"
								variant="top"
								src={item.photos[item.cover]} />
						</Col>

						<Col
							sm={6}>
							<Card.Title
								className="item-card-title">
								{item.name}
							</Card.Title>
							<Card.Body
								className="item-card-body pb-0">
								<Card.Text
									className="item-card-text">
									{item.desc.length > 100 ? item.desc.substring(0,100).trim() + "..." : item.desc}
								</Card.Text>
								<Button
									className="item-view-btn btn"
									variant="light"
									onClick={this.handleShow}>
									more info
								</Button>
							</Card.Body>
						</Col>

					</Row>

					<Modal
						size="xl"
						scrollable show={this.state.show}
						onHide={this.handleClose}
						centered
						ref={view_modal => this.view_modal = view_modal}>

						<Modal.Header
							closeButton>
							<Modal.Title>
								{item.name}
							</Modal.Title>
						</Modal.Header>

						<Modal.Body
							className="info-modal-body px-5 pb-5 pt-0">

							<Carousel
								controls={false}>
								{ item.photos.map((photo, index) => (
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

							<div
								id="scroll-anim"
								className="d-flex justify-content-center"
								display={this.state.scrolled_modal ? "none": "block"}>
								<div
									className='mouse-container'>
									<div
										className='mouse'>
										<span
											className='scroll-down'>
										</span>
									</div>
								</div>
							</div>

							<p
								className="my-5 text-justify">
								{item.desc}
							</p>

							<Row>
								<Col
									xs="6">
									<Button
										className="btn"
										variant="light">
										Edit
									</Button>
								</Col>
								<Col
									xs="6"
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

						</Modal.Body>

					</Modal>

            </Card>
        )
    }
}

export default ItemCard;

