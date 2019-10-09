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

            <Col
                key={index}
                className='item-col'
                xs={12}
                md={6}
                lg={3}>
                <Card
                    className="item-card"
                    style={{ width: "18.2rem" }}>
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
                                <Card.Text
                                    className="item-card-text">
                                    <div
                                        className="d-flex justify-content-end">
                                        <div
                                            className="empty-btn empty-btn-2 mb-2">
                                        </div>
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
                                </Card.Text>
                                <div
                                    className="d-flex justify-content-center">
                                    <div
                                        className="empty-btn empty-btn-1">
                                    </div>
                                </div>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Col>
        ));

        return (
            <div>

                <Row className="my-3 justify-content-center">
                    { skeletons }
                </Row>
            </div>
        )
    }
}

export default ItemSkeleton
