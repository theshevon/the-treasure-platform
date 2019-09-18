import React, { Component } from 'react'
import axios from "axios";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Item from '../components/Item'
import itemsData from '../data/items'

export class Items extends Component {

    // this just stores stub data for now
    // -- will be updated when backend is ready
    state = {
        items: itemsData
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
                { itemListContent }
            </div>
        )
    }
}

export default Items;
