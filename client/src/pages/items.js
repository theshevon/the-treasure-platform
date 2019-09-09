import React, { Component } from 'react'
import axios from "axios";
import GridList from "@material-ui/core/GridList";
import GridTile from '@material-ui/core/GridListTile'
import Item from "../components/Item";
import itemsData from "../data/items";
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

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
                <GridList cols={3}>
                    { this.state.items.map(item => (
                        <GridTile
                            key={item.id}
                            rows='2'
                        >
                            <Item item={ item }/>
                        </GridTile>
                    ))}
                </GridList>
            )
        } else {
            itemListContent = null;
        }


        return (
            <div>
                <h1>Item Catalogue</h1>
                { itemListContent }
            </div>

        )
    }
}

export default Items;
