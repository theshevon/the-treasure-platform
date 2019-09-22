import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import '../stylesheets/item.css'

export class Item extends Component {

	state = {
        show : false
    }

    handleClose = () => {
		this.setState({ show : false })
	};

	handleShow = () => {
		this.setState({ show : true })
	};

	handleScroll = () => {

		// .scrolled-nav{
		// 	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.045);
		// 	background-color: white;
		// 	transition: 500ms;
		// }
	}

	componentDidMount(){
		window.addEventListener('scroll', this.handleScroll);
	}

    render() {

        const { item } = this.props;

        return (

            	<Card className="item-card">
					<Row>
						<Col sm={6} className="pb-0">
							<Card.Img className="item-card-img-top" variant="top" src={item.cover} />
						</Col>
						<Col sm={6}>
							<Card.Title className="item-card-title">{item.name}</Card.Title>
							<Card.Body className="item-card-body pb-0">
								<Card.Text className="item-card-text">
									{item.desc.length > 100 ? item.desc.substring(0,100).trim() + "..." : item.desc}
								</Card.Text>
								<Button className="item-view-btn btn" variant="light" onClick={this.handleShow}>more info</Button>
							</Card.Body>
						</Col>
					</Row>

					<Modal size="xl" scrollable show={this.state.show} onHide={this.handleClose} centered>

						<Modal.Header closeButton>
							<Modal.Title>{item.name}</Modal.Title>
						</Modal.Header>
						<Modal.Body className="info-modal-body px-5 pb-5 pt-0">
							<Carousel controls={false}>
								<Carousel.Item>
									<img
									className="d-block w-100 img-fluid"
									src={item.cover}
									alt="First slide"
									/>
								</Carousel.Item>
								<Carousel.Item>
									<img
									className="d-block w-100 img-fluid"
									src={item.cover}
									alt="Third slide"
									/>
								</Carousel.Item>
								<Carousel.Item>
									<img
									className="d-block w-100 img-fluid"
									src={item.cover}
									alt="Third slide"
									/>
								</Carousel.Item>
							</Carousel>
							<div id="scroll-anim" className="d-flex justify-content-center">
								<div className='mouse-container'>
									<div className='mouse'>
										<span className='scroll-down'></span>
									</div>
								</div>
							</div>
							<p className="my-5 text-justify">{item.desc}</p>
							<Row>
								<Col xs="6">
									<Button className="btn" variant="light">Edit</Button>
								</Col>
								<Col xs="6" className="d-flex justify-content-end">
									<Button className="btn" variant="light">View Interested</Button>
									<Button className="btn ml-2" variant="light">Assign Item</Button>
								</Col>
							</Row>
						</Modal.Body>

					</Modal>

            </Card>
        )
    }
}

export default Item;

