import React, { Component } from 'react';

// custom components
import InviteModal from "../components/InviteModal";

export class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <InviteModal />
            </div>
        )
    }
}

export default Dashboard
