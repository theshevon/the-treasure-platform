// Form.js

import React, { useState } from 'react';
import InviteeInputs from './InviteeInputs';
import { Row, Col, Button} from 'react-bootstrap';

const InviteForm = () => {
    const blankInvitee = { name: '', email: '' };
    const [inviteeState, setInviteeState] = useState([
        { ...blankInvitee },
    ]);

    const addInvitee = () => {
        setInviteeState([...inviteeState, { ...blankInvitee }]);
    };

    const handleInviteeChange = (e) => {
        const updatedInvitees = [...inviteeState];
        updatedInvitees[e.target.dataset.idx][e.target.className] = e.target.value;
        setInviteeState(updatedInvitees);
        console.log(e);
    };

    return (
        <form>
            {
                inviteeState.map((val, idx) => (
                    <InviteeInputs
                        key={`invitee-${idx}`}
                        idx={idx}
                        inviteeState={inviteeState}
                        handleInviteeChange={handleInviteeChange}
                    />
                ))
            }
            <div className = 'btn-col-xs-3'>
            <Button variant="light" onClick={addInvitee}> Add another </Button>
            </div>

        </form>

    )
};

export default InviteForm



// import React, { Component } from 'react'
// import Form from 'react-bootstrap/Form'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Button from 'react-bootstrap/Button'
//
// export class InviteForm extends Component {
//     render() {
//
//         var formRow = (
//             <Row className="my-2">
//                 <Col xs="11">
//                     <Row>
//                         <Col>
//                             <Form.Control placeholder="muhammed" />
//                         </Col>
//                         <Col>
//                             <Form.Control placeholder="wong"/>
//                         </Col>
//                         <Col>
//                             <Form.Control placeholder="name@example.com" />
//                         </Col>
//                     </Row>
//                 </Col>
//                 <Col xs="1">
//                     <Button variant='outline-secondary'>x</Button>
//                 </Col>
//             </Row>
//         )
//
//         return (
//             <div>
//                 <Form>
//                     <Row>
//                         <Col xs="11">
//                             <Row>
//                                 <Col style={{"fontWeight" : "bold"}}>
//                                     First Name
//                                 </Col>
//                                 <Col style={{"fontWeight" : "bold"}}>
//                                     Last Name
//                                 </Col>
//                                 <Col style={{"fontWeight" : "bold"}}>
//                                     Email Address
//                                 </Col>
//                             </Row>
//                         </Col>
//                     </Row>
//                     { formRow }
//                     { formRow }
//                     { formRow }
//                     { formRow }
//                     { formRow }
//                 </Form>
//             </div>
//         )
//     }
// }
//
// export default InviteForm
