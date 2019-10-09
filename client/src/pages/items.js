import React, { Component } from 'react'
import axios from "axios";

// boostrap imports
import Button from 'react-bootstrap/Button'
import Alert  from 'react-bootstrap/Alert'
import Modal  from 'react-bootstrap/Modal'
import Row    from 'react-bootstrap/Row'
import Col    from 'react-bootstrap/Col'

// custom components
import ItemSkeleton from '../components/items/ItemSkeleton'
import AddItemForm  from '../components/items/AddItemForm'
import Navbar       from '../components/util/Navbar'
import ItemCard     from '../components/items/ItemCard'

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
                <container className='all-items-container'>
                    { this.state.items.map((item, index) => (
                        <ItemCard
                            className="my-5"
                            item={ item }/>
                        )
                    )}
                </container>
            )
        }

        return (
            <div>

                <Navbar />

                <div
                    id="content"
                    className="container">
                    <h1
                        className="page-title mb-5">
                        ITEMS
                    </h1>

                    { itemListContent }
                </div>
            </div>
        )
    }
}

export default Items;
