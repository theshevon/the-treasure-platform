import React, { Component } from 'react';

// bootstrap imports
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// custom css
import '../stylesheets/navbar.css'

class NavbarComponent extends Component {

    state = {
        scrolled : false,
    }

    componentDidMount() {
        document.addEventListener('scroll', () => {
            const scrolled = window.scrollY !== 0;
            if (scrolled !== this.state.scrolled) {
                this.setState({ scrolled: scrolled });
            }
        });
    }

    render() {

        let navbarClass;
        let brandClass;

        if (this.state.scrolled){
            navbarClass = "navbar-scrolled";
            brandClass = "navbar-brand navbar-brand-scrolled";
        } else {
            navbarClass = "navbar";
            brandClass = "navbar-brand"
        }

        return (
            <Navbar
                className={navbarClass}
                expand="sm"
                fixed="top">

                <Navbar.Brand
                    href="/"
                    className={brandClass}>
                    {'Wildcats'}
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="basic-navbar-nav" />

                <Navbar.Collapse
                    id="basic-navbar-nav">
                    <Nav
                        className="mr-auto">
                        <Nav.Link
                            href="/login">
                            Login
                        </Nav.Link>
                        <Nav.Link
                            href="/items">
                            Items
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>
        )
    }
}

export default NavbarComponent;