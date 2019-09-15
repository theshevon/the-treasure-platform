import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export class InviteForm extends Component {
    render() {

        var formRow = (
            <Row className="my-2">
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
        )

        return (
            <div>
                <Form>
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
