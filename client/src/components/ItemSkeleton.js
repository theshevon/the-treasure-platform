import React, { Component } from 'react'
import NoImg from '../images/no-img.png'

// boostrap imports
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// custom CSS
import '../stylesheets/item-skeleton.css'

class ItemSkeleton extends Component {

    render() {

        const skeletons = Array.from({ length : 6 }).map((item, index) => (

            <Col key={index} className='item-col' xs={12} md={6}>
                <Card
                    className="item-card">
                    <Row>
                        <Col
                            sm={6}
                            className="pb-0">
                            {/* <Card.Img
                                className="item-card-img-top"
                                variant="top"
                                src={ NoImg } /> */}
                            <div className="empty-img"></div>
                        </Col>
                        <Col
                            sm={6}>
                            <Card.Title
                                className="item-card-title d-flex justify-content-center">
                                <div className="empty-line empty-title my-2"></div>
                            </Card.Title>
                            <Card.Body
                                className="item-card-body py-2">
                                <Card.Text
                                    className="item-card-text">
                                    <div className="empty-line empty-line-2 mb-2"></div>
                                    <div className="empty-line empty-line-2 my-2"></div>
                                    <div className="empty-line empty-line-2 my-2"></div>
                                </Card.Text>
                                <div className="d-flex justify-content-center">
                                    <div className="empty-btn"></div>
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



