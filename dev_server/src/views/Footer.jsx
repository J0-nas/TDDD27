import React from 'react';
import ReactDOM from 'react-dom';

import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';

export default class Footer extends React.Component {
    render() {
        return (
            <Navbar fixedBottom inverse id="footer">
                <Nav>
                    <NavItem eventKey={1} href="#"><i className="material-icons">account_circle</i></NavItem>
                    <NavItem eventKey={1} href="#"><i className="material-icons">person</i></NavItem>
                    <NavItem eventKey={1} href="#"><i className="material-icons">whatshot</i></NavItem>
                    <NavItem eventKey={1} href="#"><i className="material-icons">star</i></NavItem>
                    <NavItem eventKey={1} href="#"><i className="material-icons">star_border</i></NavItem>
                    <NavItem eventKey={2} href="#"><i className="material-icons">assessment</i></NavItem>
                    <NavItem eventKey={3} href="#"><i className="material-icons">favorite</i></NavItem>
                    <NavItem eventKey={3} href="#"><i className="material-icons">favorite_border</i></NavItem>
                    <NavItem eventKey={3} href="#"><i className="material-icons">mood</i></NavItem>
                    <NavItem eventKey={3} href="#"><i className="material-icons">mood_bad</i></NavItem>
                </Nav>
            </Navbar>
        );
    }
}
