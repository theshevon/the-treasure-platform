import React, { Component } from 'react'
import Col from 'react-bootstrap/Col'

class ImageSelector extends Component {

    render() {

        let { index, src, ticked } = this.props;

        return (
            <Col key={index} className='item-col' xs={12} md={4}>
                <img src={src} className="img-thumbnail img-fluid"></img>
            </Col>
        )
    }
}

export default ImageSelector
