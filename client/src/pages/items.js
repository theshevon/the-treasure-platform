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

/**
 * Represents the `items` page, that users can go to in order to view the
 * catalogued items.
 */
class Items extends Component {

    state = {
        items            : null,
        showAddItemModal : false,
        loading          : true,
        showAlert        : false,
        alertMsg         : ''
    }

    async componentDidMount(){
        // fetch item data from database
        await this.fetchItemsData();
    }

    /**
     * Retrieves all the item data from the server.
     */
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
                    .catch(err =>
                        console.log(err)
                    );
    }

    /**
     * Handles the closing of the modal.
     */
    handleClose = () => {
		this.setState({ showAddItemModal : false })
	}

    /**
     * Handles the opening of the modal.
     */
	handleShow = () => {
		this.setState({ showAddItemModal : true })
	}

    render() {

        // by default, render the item skeletons
        let itemListContent = (<ItemSkeleton/>);

        if (!this.state.loading){

            if (this.state.items.length > 0){
                // create appropriates cards to represent each item
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
                // fallback for when no items have been catalogued, or if
                // none of them have been shared with the current user
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

                    {/* page title */}
                    <h1
                        className="page-title mb-5">
                        ITEMS
                    </h1>

                    {/* list of catalogued items */}
                    { itemListContent }
                </div>

            </div>
        );
    }
}

Items.propTypes = {
    user: PropTypes.object.isRequired,
}

const mapStatesToProps = (state) => ({
	user : state.user,
});

export default connect(mapStatesToProps)(Items);