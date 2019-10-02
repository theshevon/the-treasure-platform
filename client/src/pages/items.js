import React, { Component } from 'react'
import axios from "axios";

// boostrap imports
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// custom components
import ItemSkeleton from '../components/ItemSkeleton'
import Navbar       from '../components/Navbar'
import Item         from '../components/Item'

// custom css
import '../stylesheets/items.css'
import '../stylesheets/item.css'

// stub data
// import itemsData from '../data/items'

class Items extends Component {

    state = {
        items: null,
        loading: true
    }

    // fetch item data from database
    componentDidMount(){
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
                            <Item
                                className="my-5"
                                item={ item }/>
                        </Col>
                    ))}
                </Row>
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
                    { itemListContent }
                </div>
            </div>
        )
    }
}

export default Items;
