import React from 'react';
import ReactDOM from 'react-dom';

import {
    Navbar,
    Nav,
    NavItem,
    MenuItem,
    NavDropdown,
    Button,
    ButtonGroup
} from 'react-bootstrap';

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
                    <NavItem>
                        user
                    </NavItem>
                    <NavItem eventKey={1} href="#">
                        <ButtonGroup id="SignUpSignIn">
                            <Button bsStyle="primary">Sign up</Button>
                            <Button bsStyle="info">Sign in</Button>
                        </ButtonGroup>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}
