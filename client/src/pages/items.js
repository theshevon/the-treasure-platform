import React, { Component } from 'react'
import axios from "axios";

// boostrap imports
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// custom components
import AddItemForm from '../components/AddItemForm'
import Navbar from '../components/Navbar'
import Item from '../components/Item'

// custom css
import '../stylesheets/items.css'
import '../stylesheets/item.css'

// stub data
import itemsData from '../data/items'

class Items extends Component {

    state = {
        items: itemsData,
        showAddItemModal: false
    }

    // fetch item data from database
    // componentDidMount(){
    //     axios.get({
    //                 method: 'get',
    //                 url: 'http://localhost:5000/comp30022app/us-central1/api/items'
    //             })
    //             .then(res => {
    //                 this.setState({
    //                     items: res.data
    //                 })
    //             })
    //             .catch(
    //                 err => console.log(err)
    //             );
    // };

    // handle modal close
    handleClose = () => {
		this.setState({ showAddItemModal : false })
	};

    // handle modal show
	handleShow = () => {
		this.setState({ showAddItemModal : true })
	};

    render() {

        let itemListContent;

        if (this.state.items){
            itemListContent = (
                <Row className="my-3">
                    { this.state.items.map((item, index) => (
                        <Col key={index} className='item-col' xs={12} md={6}>
                            <Item className="my-5" item={ item }/>
                        </Col>
                    ))}
                </Row>
            )
        } else {
            itemListContent = null;
        }

        return (
            <div>

                <Navbar />

                <div id="content" className="container">

                    <h1 className="page-title"> ITEMS </h1>

                    <Button className="mt-2 add-btn btn" variant="light" onClick={this.handleShow}>Add Item</Button>

                    <Modal className="add-item-modal" show={this.state.showAddItemModal} size="lg" onHide={this.handleClose} centered scrollable>
                        <Modal.Header closeButton>
                            <Modal.Title>Add A New Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddItemForm />
                        </Modal.Body>
                    </Modal>

                    { itemListContent }

                </div>
            </div>
        )
    }
}

export default Items;
