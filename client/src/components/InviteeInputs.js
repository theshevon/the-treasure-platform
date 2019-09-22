import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form } from 'react-bootstrap';
import '../stylesheets/invite-modal.css'


// Stores input data in arrays
const InviteeInputs = ({ idx, inviteeState, handleInviteeChange }) => {
    const name = `name-${idx}`;
    const email = `email-${idx}`;
    return (
        <div key={`invitee-${idx}`}>
            <Form>
                <Row >
                <Col xs={5}>
                        <label htmlFor={name}>{`Name`}</label>
                        <input
                            type="text"
                            name={name}
                            data-idx={idx}
                            id={name}
                            className="name"
                            value={inviteeState[idx].name}
                            onChange={handleInviteeChange}
                        />
                </Col>
                <Col xs={5}>

                        <label htmlFor={email}>{`Email`}</label>
                        <input
                            type="text"
                            name={email}
                            data-idx={idx}
                            id={email}
                            className="email"
                            value={inviteeState[idx].email}
                            onChange={handleInviteeChange}
                        />
                </Col>

                </Row>

            </Form>
        </div>
    );
};

InviteeInputs.propTypes = {
    idx: PropTypes.number,
    inviteeState: PropTypes.array,
    handleInviteeChange: PropTypes.func,
};

export default InviteeInputs;
