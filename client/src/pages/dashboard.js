import React, { Component } from 'react';

// custom components
import AddItemModal from '../components/AddItemModal'
import InviteModal  from '../components/InviteModal'
import Navbar       from '../components/Navbar'

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
                    <AddItemModal />
                    <InviteModal />
                </div>

            </div>
        )
    }
}

export default Dashboard
