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

        let { intUserIDs } = this.props;

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
                        let intUsers=[];
                        for (let i=0; i<intUserIDs.length; i++){
                            if (idsToData.hasOwnProperty([intUserIDs[i]])){  // TODO: remove this clause after seeding db
                                intUsers.push(idsToData[intUserIDs[i]]);
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
            userList = (<Spinner animation="border" size="sm"/>);
        } else {
            intUsers = this.state.intUsers;

            userList = ("No one has expressed interest in this item yet.");

            if (intUsers.length > 0){
                userList = (
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
                );
            }
        }

        let backdrop = null;
        if (this.state.show){
            backdrop = (
                            <div
                                className = "int-user-modal-backdrop fade modal-backdrop show">
                            </div>
                        );
        }

        return (

            <div>

                {/* View Interested Button */}
                <Button
                    className="btn m-1"
                    variant="light"
                    onClick = {this.handleShow}>
                    View Interested
                </Button>

                { backdrop }

                <Modal
					size="sm"
					scrollable
					show={this.state.show}
					onHide={this.handleClose}
                    centered
                    className="int-user-modal"
					ref={view_int_modal => (this.view_int_modal = view_int_modal)}>

					<Modal.Header
						closeButton>
						<Modal.Title
                            className="sub-modal-title">
							Interested
						</Modal.Title>
					</Modal.Header>

					<Modal.Body
						className="px-5 pb-5 pt-0">
                        <Row
                            className="user-list d-flex justify-content-center">
                            { userList }
                        </Row>
					</Modal.Body>

				</Modal>

            </div>
        )
    }
}

export default ViewInterestedModal
