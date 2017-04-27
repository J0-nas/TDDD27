import React from 'react';
import ReactDOM from 'react-dom';

import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';

export default class Header extends React.Component {
    render() {
        return (
            <Navbar fixedTop inverse id="header">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Mousika</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#">
                        <i className="material-icons">input</i>
                    </NavItem>
                    <NavItem eventKey={3} href="#">user</NavItem>
                </Nav>
            </Navbar>
        );
    }
}
