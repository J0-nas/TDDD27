import React from 'react';
import ReactDOM from 'react-dom';

import LoginView from './LoginView.jsx';
import RegisterView from './RegisterView.jsx';

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
  constructor() {
    super();
    this.state = {
      showRegister: false,
      showLogin: false
    }

    this.openLogin = this.openLogin.bind(this);
    this.openRegister = this.openRegister.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
  }

  openLogin() {
    this.setState({showLogin: true});
  }

  openRegister() {
  	this.setState({showRegister: true});
  }

  closeHandler() {
    this.setState({
      showLogin: false,
      showRegister: false
    });
  }

  render() {
    return (
      <div>
        <RegisterView registerOpened={this.state.showRegister} closeHandler={this.closeHandler}/>
        <LoginView loginOpened={this.state.showLogin} closeHandler={this.closeHandler}/>
        <Navbar fixedTop inverse id="header">
          <Navbar.Header>
            <Navbar.Brand id="Logo" className="hidden-xs">
              <img src="https://mousika.herokuapp.com/images/Logo_re_plain.svg" onError={(x => "this.src='https://mousika.herokuapp.com/images/Logo_4.png'")}></img>
            </Navbar.Brand>
            <Navbar.Brand id="Name">
              Mousika
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem id="ButtonSignInSignUp">
              <Button bsStyle="primary" onClick={this.openRegister}>Sign up</Button>
              <Button bsStyle="info" onClick={this.openLogin}>Sign in</Button>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
