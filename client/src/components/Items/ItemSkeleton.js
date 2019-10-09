import React, { Component } from 'react'

// boostrap imports
import Card from 'react-bootstrap/Card'
import Row  from 'react-bootstrap/Row'
import Col  from 'react-bootstrap/Col'

// custom CSS
import '../../stylesheets/item-skeleton.css'

class ItemSkeleton extends Component {

    render() {

        const skeletons = Array.from({ length : 8 }).map((item, index) => (

            <Card
                key={index}
                className="item-card">
                <Row>
                    <Col
                        sm={12}
                        className="pb-0">
                        <Card.Title
                            className="item-card-title d-flex justify-content-center">
                            <div
                                className="empty-line empty-title my-2">
                            </div>
                        </Card.Title>
                        <div className="empty-img"></div>
                    </Col>
                    <Col
                        sm={12}>

                        <Card.Body
                            className="item-card-body py-2">
                            <div
                                className="item-card-text">
                            </div>
                            <div
                                className="d-flex justify-content-end">
                            </div>
                            <div
                                className="empty-btn empty-btn-2 mb-2">
                            </div>
                            <div
                                className="empty-line empty-line-2 mb-2">
                            </div>
                            <div
                                className="empty-line empty-line-2 my-2">
                            </div>
                            <div
                                className="empty-line empty-line-2 my-2">
                            </div>
                            <div
                                className="d-flex justify-content-center">
                            </div>
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

export default ItemSkeleton
