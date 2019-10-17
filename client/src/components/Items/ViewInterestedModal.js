import React, { Component } from 'react';
import axios                from 'axios';

// bootstrap imports
import Button from 'react-bootstrap/Button';
import Modal  from 'react-bootstrap/Modal';

// custom components
import UserTag from '../users/UserTag';

// custom css
import '../../stylesheets/view-interested.css';

class ViewInterestedModal extends Component {

    state = {
        show     : false,
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
                            idsToData[user.uid] = [user.name, user.img];
                        });

                        // map all the interested user ids to their data
                        let count=0;
                        for (let i=0; i<intUsers.length; i++){
                            if (idsToData.hasOwnProperty(intUsers[i])){  // TODO: remove this clause after seeding db
                                intUsers[count++] = idsToData[intUsers[i]];
                            }
                        }

                        this.setState({ intUsers : intUsers });
                    })
                    .catch(err => {
                        console.log(err);
                    });
    }

    handleClose = () => this.setState({ show : false });

    handleShow = () => this.setState({ show : true });

    render() {

        let intUsers = this.state.intUsers;

        let userList = ("No one has expressed interest in this item yet.");
        console.log(intUsers);
        if (intUsers.length > 0){
            userList = (
                <div
                    className="user-list">

                    { intUsers.map((userData, index) => (
                        <UserTag
                            key    = {index}
                            name   = {userData[0]}
                            imgSrc = {userData[1]}/>
                    ))}

                </div>
            );
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
					size="md"
					scrollable
					show={this.state.show}
					backdrop
					onHide={this.handleClose}
					centered
					ref={view_modal => (this.view_modal = view_modal)}>

					{/* item name */}
					<Modal.Header
						closeButton>
						<Modal.Title>
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
