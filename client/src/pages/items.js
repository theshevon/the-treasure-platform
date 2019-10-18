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

                        let allItems = res.data;

                        // filter out the items to only have the visible items
                        let visibleItems = [];

                        if (this.props.user.type === 0){
                            visibleItems = allItems;
                        } else {
                            allItems.forEach(item => {
                                if (item.visibleTo.includes(this.props.user.id)){
                                    visibleItems.push(item);
                                }
                            });
                        }

                        this.setState({
                            items: visibleItems,
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