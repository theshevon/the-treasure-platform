import React, { Component } from 'react'

// boostrap imports
import Alert from 'react-bootstrap/Alert'
import Col   from 'react-bootstrap/Col'
import Row   from 'react-bootstrap/Row'

// custom components
import AddItemForm  from '../components/items/AddItemForm'
import InviteForm   from '../components/users/InviteForm'
import FormModal    from '../components/util/FormModal'
import Navbar       from '../components/util/Navbar'

// custom css
import '../stylesheets/common.css'
import '../stylesheets/dashboard.css'

// custom icons
import inviteIcon from '../icons/invite.svg'
import itemIcon   from '../icons/item.svg'

export class Dashboard extends Component {

    state = {
        showAlert: false,
        alertMsg : null
    }

    // displays alerts on the page upon completion of a task
    handleAlert = (msg) => {
        this.setState({
                        showAlert : true,
                        alertMsg  : msg
                       });
    }

    // clears an alert message
    clearAlert = () => {
        this.setState({
                        showAlert : false,
                        alertMsg  : null,
        });
    }

    render() {

        let alert = null;
        if (this.state.showAlert){
            alert = (
                <Alert
                    className="mt-1"
                    variant="success"
                    style={{textAlign : "center"}}
                    onClose={ this.clearAlert }
                    dismissible>
                <p>
                   { this.state.alertMsg }
                </p>
            </Alert>
            )
        }

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

                    { alert }

                    <Row
                        className="mt-5 d-flex justify-content-center">
                        <Col
                            xs="12"
                            md="4"
                            className="dashboard-option-container">
                            <Col
                                className="dashboard-option">
                                <img
                                    className="img-fluid icon invite-icon mb-3"
                                    alt="invite-icon"
                                    src={ inviteIcon }/>
                                <FormModal
                                    modalSize="md"
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
                                <img
                                    className="img-fluid icon item-icon mb-3"
                                    alt="item-icon"
                                    src={ itemIcon }/>
                                <FormModal
                                    modalSize="lg"
                                    triggerBtnText="Add A New Item"
                                    title="Add A New Item"
                                    form={
                                        < AddItemForm
                                            handleAlert={ this.handleAlert }
                                        /> } />
                            </Col>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Dashboard;
