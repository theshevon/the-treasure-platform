import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export class InviteForm extends Component {
    render() {

        var formRow = (
            <Row className="my-2">
                <Col>
                    <Form.Control placeholder="First name" />
                </Col>
                <Col>
                    <Form.Control placeholder="Last name" />
                </Col>
                <Col>
                    <Form.Control placeholder="Email" />
                </Col>
            </Row>
        )

        return (
            <div>
                <Form>
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
