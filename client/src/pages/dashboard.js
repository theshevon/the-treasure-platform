import React, { Component } from 'react';

// boostrap imports
import Alert from 'react-bootstrap/Alert';
import Col   from 'react-bootstrap/Col';
import Row   from 'react-bootstrap/Row';

// custom components
import AddItemForm  from '../components/items/AddItemForm';
import InviteForm   from '../components/users/InviteForm';
import FormModal    from '../components/util/FormModal';
import Navbar       from '../components/util/Navbar';

// custom css
import '../stylesheets/common.css';
import '../stylesheets/dashboard.css';

// custom icons
import inviteIcon from '../icons/invite.svg';
import itemIcon   from '../icons/item.svg';

/**
 * Represents the `Dashboard` page that a Primary User can use to perform
 * admin actions.
 */
class Dashboard extends Component {

    state = {
        showAlert: false,
        alertMsg : null
    }

    /**
     * Displays alerts on the page upon completion of a task.
     */
    handleAlert = (msg) => {
        this.setState({
                        showAlert : true,
                        alertMsg  : msg
                       });
    }

    /**
     * Clears an alert message.
     */
    clearAlert = () => {
        this.setState({
                        showAlert : false,
                        alertMsg  : null,
        });
    }

    render() {

        // dashboard options container
        let dashboardOptsClass = "mt-6 d-flex justify-content-center";

        // create an alert, if needed
        let alert = null;
        if (this.state.showAlert){

            dashboardOptsClass = "mt-4 d-flex justify-content-center";

            alert = (
                <Alert
                    className="mt-1"
                    variant="success"
                    style={{ textAlign : "center" }}
                    onClose={ this.clearAlert }
                    dismissible>
                    <p>
                        { this.state.alertMsg }
                    </p>
                </Alert>
            );
        }

        return (

            <div
                className="dashboard">

                <Navbar/>

                <div
                    id="content"
                    className="container">

                    {/* page title */}
                    <h1
                        className="page-title">
                        DASHBOARD
                    </h1>

                    { alert }

                    <Row
                        className={dashboardOptsClass}>

                        {/* invite user option */}
                        <Col
                            xs="12"
                            sm="8"
                            md="6"
                            lg="4"
                            className="dashboard-option-container mb-4">

                            <Col
                                xs="12"
                                className="dashboard-option">

                                <img
                                    className="icon invite-icon mb-3"
                                    alt="invite-icon"
                                    src={ inviteIcon }/>

                                <FormModal
                                    modalSize="md"
                                    triggerBtnText="Invite New Users"
                                    title="Invite Users"
                                    form={ < InviteForm /> }/>
                            </Col>

                        </Col>

                        {/* add item option */}
                        <Col
                            xs="12"
                            sm="8"
                            md="6"
                            lg="4"
                            className="dashboard-option-container">

                            <Col
                                xs="12"
                                className="dashboard-option">

                                <img
                                    className="icon item-icon mb-3"
                                    alt="item-icon"
                                    src={ itemIcon }/>

                                <FormModal
                                    modalSize="lg"
                                    triggerBtnText="Add A New Item"
                                    title="Add Item"
                                    form={
                                        < AddItemForm
                                            handleAlert={ this.handleAlert }
                                        /> } />
                            </Col>

                        </Col>

                    </Row>
                </div>
            </div>
        );
    }
}

export default Dashboard;
