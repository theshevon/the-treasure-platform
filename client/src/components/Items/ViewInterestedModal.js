import React, { Component } from 'react'
import axios from 'axios'

// bootstrap imports
import Button from 'react-bootstrap/Button'

// sweet alert import
import SweetAlert from 'react-bootstrap-sweetalert';

// custom icons
import userIcon  from '../../icons/user.svg';

class ViewInterestedModal extends Component {
    state = {
        show     : false,
        allUsers : []
    }

    componentDidMount(){

        axios({
                method: 'get',
                url: '/users'
            })
            .then(res => {
                let users = res.data;
                this.setState({
                    allUsers    : users,
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleClose = () => this.setState({ show : false });
    handleShow = () => this.setState({ show : true });

    render() {

        const { intUsers } = this.props;
        let listIntUsers = [];

        if (intUsers.length === 0) {
            listIntUsers = "No one is interested yet."
        } else {
            // match the interested user ids to users (with name and id)
            for (let j = 0; j < intUsers.length; j++) {
                for (let i = 0; i < this.state.allUsers.length; i++) {
                    if (this.state.allUsers[i].uid === intUsers[j]){
                        listIntUsers.push(this.state.allUsers[i])
                    }
                 }
              }
            // make a list of user names
            listIntUsers = listIntUsers.map((user) =>
                <li key={user.uid}>{user.name}</li>
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

                {/* bullet list of interested user names */}
                <SweetAlert
                show = {this.state.show}
                custom
                customIcon={userIcon}
                title="Interested Users"
                onConfirm={this.handleClose}
                >
                    {listIntUsers}
                </SweetAlert>
            </div>
        )
    }
}

export default ViewInterestedModal
