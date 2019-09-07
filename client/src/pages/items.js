import React, { Component } from 'react'
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Item from "../components/Item";

export class Items extends Component {

    // this just stores stub data for now
    // -- will be updated when backend is ready
    state = {
        items: [
            {
                name: "Dragoon G Beyblade",
                description: "Was owned by my grandpa, 'Buffalo Bill'"
            },
            {
                name: "item2",
                description: "item2 desc"
            },
            {
                name: "item3",
                description: "item3 desc"
            },
            {
                name: "item4",
                description: "item4 desc"
            }
        ]
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

        let itemMarkup = this.state.items ? (
            this.state.items.map(item =>
                <Item item={ item }/>
            )
        ) : <p> Loading... </p>

        return (
            <div>
                <h1>Item Catalague Page</h1>
                <Grid container spacing= { 16 }>
                    <Grid item sm={ 12 } xs = { 12 }>
                        { itemMarkup }
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Items;
