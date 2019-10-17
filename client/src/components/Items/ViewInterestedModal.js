import React, { Component } from 'react';
import axios                from 'axios';

// bootstrap imports
import Spinner from 'react-bootstrap/Spinner';
import Button  from 'react-bootstrap/Button';
import Modal   from 'react-bootstrap/Modal';
import Row     from 'react-bootstrap/Row';
import Col     from 'react-bootstrap/Col';

// custom components
import UserTag from '../users/UserTag';

// custom css
import '../../stylesheets/view-interested.css';

class ViewInterestedModal extends Component {

    state = {
        show     : false,
        loading  : true,
        intUsers : []
    }

    async componentDidMount(){

        let { intUsers } = this.props;

        await axios({
                        method : 'get',
                        url    : '/users'
                    })
                    .then(res => {
                        let users = res.data;

                        // create a mapping from user ids to data
                        let idsToData = {};
                        users.forEach(user => {
                            idsToData[user.uid] = [user.uid, user.name, user.img];
                        });

                        // map all the interested user ids to their data
                        let count=0;
                        for (let i=0; i<intUsers.length; i++){
                            if (idsToData.hasOwnProperty(intUsers[i])){  // TODO: remove this clause after seeding db
                                intUsers[count++] = idsToData[intUsers[i]];
                            }
                        }

                        this.setState({
                                        loading  : false,
                                        intUsers : intUsers
                                    });
                    })
                    .catch(err => {
                        console.log(err);
                    });
    }

    handleClose = () => this.setState({ show : false });

    handleShow = () => this.setState({ show : true });

    render() {

        let intUsers;
        let userList;

        if (this.state.loading){
            userList = (<Spinner animation="border" size="md"/>);
        } else {
            intUsers = this.state.intUsers;

            userList = ("No one has expressed interest in this item yet.");

            if (intUsers.length > 0){
                userList = (
                    <Row
                        className="user-list d-flex justify-content-center">
                        <Col
                            xs="12"
                            md="10">

                            { intUsers.map(userData => (
                                <UserTag
                                    key    = {userData[0]}
                                    name   = {userData[1]}
                                    imgSrc = {userData[2]}/>
                            ))}
                        </Col>
                    </Row>
                );
            }
        }

        return (

            <div>

                {/* View Interested Button */}
                <Button
                    className="btn"
                    variant="light"
                    onClick = {this.handleShow}>
                    View Interested
                </Button>

                <Modal
					size="sm"
					scrollable
					show={this.state.show}
					backdrop
					onHide={this.handleClose}
					centered
					ref={view_int_modal => (this.view_int_modal = view_int_modal)}>

					{/* item name */}
					<Modal.Header
						closeButton>
						<Modal.Title
                            className="sub-modal-title">
							Interested Users
						</Modal.Title>
					</Modal.Header>

					<Modal.Body
						className="info-modal-body px-5 pb-5 pt-0">
                        { userList }
					</Modal.Body>

				</Modal>

            </div>
        )
    }
}

export default ViewInterestedModal
