import React, { Component } from 'react';
import PropTypes            from 'prop-types';

// boostrap imports
import Card from 'react-bootstrap/Card';
import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';

// redux stuff
import { connect } from 'react-redux';

// custom CSS
import '../../stylesheets/item-skeleton.css';


/**
 * Represents the loading skeletons on the items page.
 */
class ItemSkeleton extends Component {

    render() {

        const { user } = this.props;

        /* placeholders to represent the 'like' button and the 'assigned' icon */
        let buttonsPlaceholder = 	(
                            <div
                                className="d-flex justify-content-between">

                                {/* assign button placeholder */}
                                <div
                                    className="empty-btn empty-btn-2 mb-2">
                                </div>

                                {/* like button placeholder */}
                                <div
                                    className="empty-btn empty-btn-2 mb-2">
                                </div>

                            </div>
                        );

        /* determine whether user is a primary user or a secondary user */
        let type   = localStorage.TreasureUType || user.type;
        if (typeof type === "string"){
            type = parseInt(type);
        }

        /* primary users don't need 'like' button or 'assigned' icon */
        if (type === 0){
            buttonsPlaceholder = null;
        }

        const skeletons = Array.from({ length : 8 }).map((item, index) => (

            <Card
                key={index}
                className="item-card">

                <Row>

                    <Col
                        sm={12}
                        className="pb-0">

                        {/* card title placeholder */}
                        <Card.Title
                            className="item-card-title d-flex justify-content-center">
                            <div
                                className="empty-line empty-title my-2">
                            </div>
                        </Card.Title>

                        {/* card image placehodler*/}
                        <div className="empty-img"></div>

                    </Col>

                    <Col
                        sm={12}>

                        <Card.Body
                            className="item-card-body py-2">

                            {/* 'like' button and 'assigned' icon placeholders */}
                            { buttonsPlaceholder }

                            {/* description placeholders */}
                            <div
                                className="empty-line empty-line-2 mb-2">
                            </div>
                            <div
                                className="empty-line empty-line-2 my-2">
                            </div>
                            <div
                                className="empty-line empty-line-2 my-2">
                            </div>

                            {/* 'more info' button placeholder */}
                            <div
                                className="empty-btn empty-btn-1">
                            </div>

                        </Card.Body>

                    </Col>

                </Row>

            </Card>
        ));

        return (
            <div
                className="all-skeletons-container">
                { skeletons }
            </div>
        )
    }
}

ItemSkeleton.propTypes = {
    user: PropTypes.object.isRequired,
}

const mapStatesToProps = (state) => ({
	user : state.user,
});

export default connect(mapStatesToProps)(ItemSkeleton);
