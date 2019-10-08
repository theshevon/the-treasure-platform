import React, { Component } from 'react'

// boostrap imports
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

// custom components
import AddItemForm  from '../components/items/AddItemForm'
import InviteForm   from '../components/users/InviteForm'
import FormModal    from '../components/util/FormModal'
import Navbar       from '../components/util/Navbar'

// custom css
import '../stylesheets/dashboard.css'

export class Dashboard extends Component {
    render() {
        return (

            <div>
                <Navbar/>

                <div
                    id="content"
                    className="container">
                    <h1
                        className="page-title">
                        DASHBOARD
                    </h1>
                    <Row
                        className="dashboard-option-container mt-5">
                        <Col
                            xs="12"
                            md="4"
                            className="dashboard-option-container">
                            <Col
                                className="dashboard-option">
                                <FormModal
                                    triggerBtnText="Invite New Users"
                                    title="Invite New Users"
                                    form={ < InviteForm /> }/>
                            </Col>
                        </Col>
                        <Col
                            xs="12"
                            md="4"
                            className="dashboard-option-container">
                            <Col
                                className="dashboard-option">
                                <FormModal
                                    triggerBtnText="Add New Item"
                                    title="Add A New Item"
                                    form={ < AddItemForm /> }/>
                            </Col>
                        </Col>
                        <Col
                            xs="12"
                            md="4"
                            className="dashboard-option-container">
                            <Col
                                className="dashboard-option">
                                <FormModal
                                    triggerBtnText="Invite New Users"
                                    title="Invite New Users"
                                    form={ < InviteForm /> }/>
                            </Col>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Dashboard;
