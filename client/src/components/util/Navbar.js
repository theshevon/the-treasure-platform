import React, { Component } from 'react';
import PropTypes            from 'prop-types';

// bootstrap imports
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container   from 'react-bootstrap/Container';
import Navbar      from 'react-bootstrap/Navbar';
import Nav         from 'react-bootstrap/Nav';

// redux stuff
import { connect }    from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

// custom css
import '../../stylesheets/navbar.css';

// logos
import logo     from '../../icons/logo.svg';
import logo_alt from '../../icons/logo-alt.svg';
import no_img   from '../../images/no_img.png';

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

    handleLogout = event => {
        event.preventDefault();
        this.props.logoutUser();
    }

    render() {

        const { user } = this.props;

        let navbarClass = "navbar";
        let brandClass  = "navbar-brand";

        // update CSS classes if scrolled
        if (this.state.scrolled){
            navbarClass = "navbar-scrolled";
            brandClass  = "navbar-brand navbar-brand-scrolled";
        }

        let menuItems = (
            <Nav
                className="mr-auto">
            </Nav>
        );

        let name   = localStorage.TreasureUName || user.name || "Loading User...";
        let imgSrc = localStorage.TreasureUImg  || user.imgSrc || no_img;
        let type   = localStorage.TreasureUType || user.type;

        if (typeof type === "string"){
            type = parseInt(type);
        }

        if (type === 0){
            menuItems = (
                <Nav
                    className="mr-auto">
                    <Nav.Link
                        href="/dashboard">
                        Dashboard
                    </Nav.Link>
                    <Nav.Link
                        href="/items">
                        Items
                    </Nav.Link>
                </Nav>
            );
        }

        return (

            <Container
                className="container">
                <Navbar
                    className={navbarClass}
                    expand="sm"
                    fixed="top">

                    <Navbar.Brand
                        href="/"
                        className={ brandClass + " d-flex align-items-center"}>
                        <img
                            src={ this.state.scrolled ? logo_alt : logo }
                            height="30"
                            width="30"
                            className="mr-2"
                            alt="logo"/>
                        <h2
                            className="brand-text">
                            Treasure
                        </h2>
                    </Navbar.Brand>

                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse
                        id="basic-navbar-nav"
                        className="mt-2">

                        { menuItems }

                        <Nav>

                            <Nav.Link
                                href="/items">
                                <img
                                    className="user-img"
                                    src={ imgSrc }
                                    width="25"
                                    height="25"
                                    alt="user_img">
                                </img>
                            </Nav.Link>

                            <NavDropdown
                                title={ name }
                                id="collasible-nav-dropdown">
                                <NavDropdown.Item
                                    href="/support">
                                    Support
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    onClick={ this.handleLogout }>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>
            </Container>
        )
    }
}

NavbarComponent.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
}

const mapStatesToProps = (state) => ({
	user : state.user,
});

const mapActionsToProps = {
    logoutUser
}

export default connect(mapStatesToProps, mapActionsToProps)(NavbarComponent);
