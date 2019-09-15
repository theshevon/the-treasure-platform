import React, { Component } from 'react';

// Bootstrap imports
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

class NavbarComponent extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
                <Navbar.Brand href="/" style={{"color":"#41e0fd", "fontWeight":"bolder"}}>
                    {'TheBucketList'}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/items">Items</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavbarComponent;