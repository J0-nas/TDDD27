import React from 'react';
import ReactDOM from 'react-dom';

import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';

export default class Footer extends React.Component {
    render() {
        return (
            <Navbar fixedBottom inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        User
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#">Played: 12</NavItem>
                    <NavItem eventKey={2} href="#">Won: 2</NavItem>
                </Nav>
            </Navbar>
        );
    }
}
