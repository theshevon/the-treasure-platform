import React, { Component } from 'react';

// bootstrap imports
import Navbar from 'react-bootstrap/Navbar'
import Nav    from 'react-bootstrap/Nav'

// custom css
import '../../stylesheets/navbar.css'

// logos
import logo from '../../logo.svg'

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

        let navbarClass = "navbar";
        let brandClass  = "navbar-brand";

        // update CSS classes if scrolled
        if (this.state.scrolled){
            navbarClass = "navbar-scrolled";
            brandClass  = "navbar-brand navbar-brand-scrolled";
        }

        return (
            <Navbar
                className={navbarClass}
                expand="sm"
                fixed="top">

                <Navbar.Brand
                    href="/"
                    className={ brandClass + " d-flex align-items-center"}>
                    <img
                        src={ logo }
                        height="30"
                        width="30"
                        className="mr-2"/>
                    <h2
                        className="brand-text">
                        Treasure
                    </h2>
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="basic-navbar-nav" />

                <Navbar.Collapse
                    id="basic-navbar-nav">
                    <Nav
                        className="mr-auto">
                        <Nav.Link
                            href="/dashboard">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link
                            href="/register">
                            Register
                        </Nav.Link>
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