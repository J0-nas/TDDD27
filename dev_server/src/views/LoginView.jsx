import React from 'react';
import ReactDOM from 'react-dom';

import {Form, Modal, Button, FormControl, FormGroup, Col, ControlLabel, ButtonGroup} from 'react-bootstrap';

export default class LoginView extends React.Component {
  constructor(){
    super();

    this.state = {
      showModal: false,
      passwd: ""
    }

    this.close = this.close.bind(this);
    this.login = this.login.bind(this);

    this.getValidationState = this.getValidationState.bind(this);
    this.handlePASSWDChange = this.handlePASSWDChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({showModal: nextProps.opened});
  }

  close() {
    const usernameInput = ReactDOM.findDOMNode(this.refs.usernameInput);
    const passwdInput = ReactDOM.findDOMNode(this.refs.passwdInput);
    usernameInput.value = "";
    passwdInput.value = "";
    this.setState({showModal: false});
  }

  login() {
    const usernameInput = ReactDOM.findDOMNode(this.refs.usernameInput);
    const passwdInput = ReactDOM.findDOMNode(this.refs.passwdInput);
    const username = usernameInput.value;
    const passwd = passwdInput.value;
    console.log(username, passwd);
  }

  getValidationState() {
    const length = this.state.passwd.length;
    if (length >= 6) {
      return "success";
    } else if (length == 0) {
      return null;
    } else {
      return "warning";
    }
  }

  handlePASSWDChange(e) {
    this.setState({passwd: e.target.value});
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form horizontal onSubmit={this.login}>
            <FormGroup controlId="formHorizontalUsername">
                <FormControl type="text" placeholder="Username" ref="usernameInput"/>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword" validationState = {this.getValidationState()}>
                <FormControl type="password" placeholder="Password" ref="passwdInput" onChange={this.handlePASSWDChange}/>
                <FormControl.Feedback/>
            </FormGroup>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" onClick={this.close}>Close</Button>
          <Button bsStyle="success" onClick={this.login}>Login</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
