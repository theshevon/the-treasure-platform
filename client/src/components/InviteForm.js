import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export class InviteForm extends Component {
    render() {

        var formRow = (
            <Row className="my-2">
                <Col xs="11">
                    <Row>
                        <Col>
                            <Form.Control placeholder="muhammed" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="wong"/>
                        </Col>
                        <Col>
                            <Form.Control placeholder="name@example.com" />
                        </Col>
                    </Row>
                </Col>
                <Col xs="1">
                    <Button variant='outline-secondary'>x</Button>
                </Col>
            </Row>
        )

        return (
            <div>
                <Form>
                    <Row>
                        <Col xs="11">
                            <Row>
                                <Col style={{"fontWeight" : "bold"}}>
                                    First Name
                                </Col>
                                <Col style={{"fontWeight" : "bold"}}>
                                    Last Name
                                </Col>
                                <Col style={{"fontWeight" : "bold"}}>
                                    Email Address
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {formRow}
                    {formRow}
                    {formRow}
                    {formRow}
                    {formRow}
                </Form>
            </div>
        )
    }
}

export default InviteForm
