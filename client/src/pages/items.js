import React, { Component } from 'react'
import axios from "axios";

// boostrap imports
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// custom components
import ItemSkeleton from '../components/Items/ItemSkeleton'
import AddItemForm  from '../components/Items/AddItemForm'
import Navbar       from '../components/Navbar'
import ItemCard     from '../components/Items/ItemCard'

// custom css
import '../stylesheets/items.css'
import '../stylesheets/item.css'

// stub data
// import itemsData from '../data/items'

class Items extends Component {

    state = {
        items: null,
        showAddItemModal: false,
        loading: true,
        showAlert: false,
        alertMsg : ''
    }

    constructor(props) {
        super(props)
    }

    // fetch item data from database
    componentDidMount(){
        this.fetchItemsData();
    }

    fetchItemsData = () => {
        axios({
            method: 'get',
            url: 'http://localhost:5000/comp30022app/us-central1/api/items'
        })
        .then(res => {
            this.setState({
                items: res.data,
                loading: false
            })
        })
        .catch(
            err => console.log(err)
        );
    }

    // refreshes the page
    handleRefresh = (msg) => {
        this.handleClose();
        this.setState({
                        showAlert : true,
                        alertMsg  : msg
                       });
        this.fetchItemsData();
        // window.location.reload(true);
    }

    // clears an alert message
    clearAlert = () => {
        this.setState({
                        showAlert : false,
                        alertMsg  : '',
        });
    }
    // handle modal close
    handleClose = () => {
		this.setState({ showAddItemModal : false })
	};

    // handle modal show
	handleShow = () => {
		this.setState({ showAddItemModal : true })
	};

    render() {

        let itemListContent = (<ItemSkeleton/>);

        if (!this.state.loading){
            itemListContent = (
                <Row
                    className="my-3 justify-content-center">
                    { this.state.items.map((item, index) => (
                        <Col
                            key={index}
                            className='item-col'
                            xs={12}
                            md={6}>
                            <ItemCard
                                className="my-5"
                                item={ item }/>
                        </Col>
                    ))}
                </Row>
            )
        }

        let alert = null;
        if (this.state.showAlert){
            console.log(this.state)
            alert = (
                <Alert
                    variant="info"
                    onClose={ this.clearAlert }
                    dismissible>
                <p>
                   { this.state.alertMsg }
                </p>
            </Alert>
            )
        }

        return (
            <div>

                <Navbar />

                <div
                    id="content"
                    className="container">

                    <h1
                        className="page-title">
                        ITEMS
                    </h1>

                    { alert }

                    <Button
                        className="mt-2 mb-3 add-btn btn"
                        variant="light"
                        onClick={this.handleShow}>
                        Add Item
                    </Button>

                    <Modal
                        className="add-item-modal"
                        show={this.state.showAddItemModal}
                        size="xl"
                        onHide={this.handleClose}
                        centered
                        scrollable>
                        <Modal.Header
                            closeButton>
                            <Modal.Title>
                                Add A New Item
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddItemForm
                                handleRefresh={this.handleRefresh}/>
                        </Modal.Body>
                    </Modal>

                    { itemListContent }

                </div>
            </div>
        )
    }
}

export default Items;
