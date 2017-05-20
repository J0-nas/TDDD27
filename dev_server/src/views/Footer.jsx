import React from 'react';
import ReactDOM from 'react-dom';

import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';

export default class Footer extends React.Component {
    constructor() {
        super();

        this.state = {
            activeSelection: 1
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(selectedKey) {
        this.setState({activeSelection: selectedKey});
    }

    render() {
        return (
            <div>
                <Nav id="footer" activeKey={this.state.activeSelection} bsStyle="pills" onSelect={this.handleSelect}>
                    <NavItem eventKey={1} href="#">
                        <i className="material-icons">whatshot</i>
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                        <i className="material-icons">person</i>
                    </NavItem>
                    <NavItem eventKey={3} href="#">
                        <i className="material-icons">assessment</i>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}
