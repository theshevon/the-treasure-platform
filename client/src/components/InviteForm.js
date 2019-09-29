import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class InviteForm extends Component {

    state = {
        noRows : 5       // the default no of rows will be 5
    }

    reduceNoRows = () => {
        this.setState({ noRows : (this.state.noRows - 1) });
    }

    addRows = () => {
        this.setState({ noRows : (this.state.noRows + 1) });
    }


    render() {

        let formRow = (
            <Row>
                <Col xs="11">
                    <Row>
                        <Col>
                            <Form.Control
                                placeholder="name"/>
                        </Col>
                        <Col>
                            <Form.Control
                                type="email"
                                placeholder="email"/>
                        </Col>
                    </Row>
                </Col>
                <Col xs="1">
                    <Button
                        className="del-row-btn"
                        onClick={this.reduceNoRows}>
                        ×
                    </Button>
                </Col>
            </Row>
        )

        let formContent = [];
        for (var i=0; i< this.state.noRows; i++ ){
            formContent.push(formRow);
        }

        return (
                <Form>
                    {formContent}
                    <a
                        className="add-row-btn float-left mt-4"
                        variant="light"
                        onClick={this.addRows}>
                        <span
                            className="mr-1">
                            +
                        </span>
                        <span>
                            Add Another
                        </span>
                    </a>
                </Form>
        )
    }
}

export default InviteForm
