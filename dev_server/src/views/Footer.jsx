import React from 'react';
import ReactDOM from 'react-dom';

import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';

export default class Footer extends React.Component {
    render() {
        return (
            <Nav id="footer" bsStyle="pills">
                <NavItem eventKey={2} href="#">
                    <i className="material-icons">whatshot</i>
                </NavItem>
                <NavItem eventKey={1} href="#">
                    <i className="material-icons">person</i>
                </NavItem>
                <NavItem eventKey={5} href="#">
                    <i className="material-icons">assessment</i>
                </NavItem>
            </Nav>
        );
    }
}
