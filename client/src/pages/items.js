import React, { Component } from 'react';
import axios                from 'axios';
import PropTypes            from 'prop-types';

// custom components
import ItemSkeleton from '../components/items/ItemSkeleton';
import ItemCard     from '../components/items/ItemCard';
import Navbar       from '../components/util/Navbar';

// redux stuff
import { connect }    from 'react-redux';

// custom css
import '../stylesheets/items.css';
import '../stylesheets/item.css';

class Items extends Component {

    state = {
        items            : null,
        showAddItemModal : false,
        loading          : true,
        showAlert        : false,
        alertMsg         : ''
    }

    // fetch item data from database
    async componentDidMount(){
        await this.fetchItemsData();
    }

    fetchItemsData = async () => {
        await axios({
                        method: 'get',
                        url: '/items'
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

            if (!this.state.items.length === 0){
                itemListContent = (
                    <div
                        className='all-items-container'>
                        { this.state.items.map((item, index) => (
                            <ItemCard
                                key={index}
                                className="my-5"
                                item={ item }/>
                            )
                        )}
                    </div>
                )
            } else {
                itemListContent = (
                    <div
                        className='all-items-container'>
                        <h2
                            className="no-items-msg">
                            Sorry, there are no items for you to view yet.
                        </h2>
                    </div>
                )
            }
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

Items.propTypes = {
    user: PropTypes.object.isRequired,
}

const mapStatesToProps = (state) => ({
	user : state.user,
});

export default connect(mapStatesToProps)(Items);