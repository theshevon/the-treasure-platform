import React, { Component } from 'react'
import axios from "axios";

// boostrap imports
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

// custom css
import Item from "../components/Item"
import "../components/Item.css"

// stub data
import itemsData from "../data/items"

class Items extends Component {

    state = {
        items: itemsData,
        showAddModal: false
    }

    // fetch item data from database
    // componentDidMount(){
    //     axios.get("/items")
    //         .then(res => {
    //             this.setState({
    //                 items: res.data
    //             })
    //         })
    //         .catch(
    //             err => console.log(err)
    //         );
    // };

    handleClose = () => {
		this.setState({ showAddModal : false })
	};

	handleShow = () => {
		this.setState({ showAddModal : true })
	};

    render() {

        let itemListContent;

        if (this.state.items){
            itemListContent = (
                <Row className="my-3">
                    { this.state.items.map(item => (
                        <Col xs={12} md={6} lg={4}>
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
                <h1> ITEMS </h1>
                <Button className="btn" variant="light" onClick={this.handleShow}>Add Item</Button>
                <Modal show={this.state.showAddModal} size="lg" onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add A New Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="light" onClick={this.handleClose}>
                        Next
                    </Button>
                    </Modal.Footer>
                </Modal>
                { itemListContent }
            </div>
        )
    }
}

export default Items;
