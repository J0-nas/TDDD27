import React from 'react';
import ReactDOM from 'react-dom';

import {Form, Modal, Button, FormControl, FormGroup} from 'react-bootstrap';

import UtilityServerConnection from './../logic/UtilityServerConnection.jsx';
import ResponseStatusCodes from './../logic/ResponseStatusCodes.jsx';

export default class LoginView extends React.Component {
  constructor(){
    super();

    this.state = {
      showModal: false,
      username: "",
      passwd: ""
    }
    this.serverConnection = new UtilityServerConnection();

    this.close = this.close.bind(this);
    this.login = this.login.bind(this);

    this.getValidationState = this.getValidationState.bind(this);
    this.handlePasswdChange = this.handlePasswdChange.bind(this);
    this.handleResp = this.handleResp.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({showModal: nextProps.loginOpened});
    console.log("login recieved", nextProps);
  }

  close() {
    const usernameInput = ReactDOM.findDOMNode(this.refs.usernameInput);
    const passwdInput = ReactDOM.findDOMNode(this.refs.passwdInput);
    usernameInput.value = "";
    passwdInput.value = "";
    this.setState({showModal: false});
    this.props.closeHandler();
  }

  handleResp(dict) {
    if (Number(dict['status']) == ResponseStatusCodes.operationSuccess) {
      //logged in
      localStorage.setItem("username", this.state.username);
      this.close();
    } else {
      console.log(Number(dict['status']), ResponseStatusCodes.operationSuccess, dict['value']);
    }
  }

  login() {
    const username = ReactDOM.findDOMNode(this.refs.usernameInput).value;
    const passwd = ReactDOM.findDOMNode(this.refs.passwdInput).value;
    this.setState({username: username});
    if (
      (username.length == 0) ||
      (passwd.length < 6)) {
      return;
    }

    const resp = this.serverConnection.loginRequest(username, passwd);
    resp.then(this.handleResp, x => console.log("could not parse json", x));
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

  handlePasswdChange(e) {
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
                <FormControl type="password" placeholder="Password" ref="passwdInput" onChange={this.handlePasswdChange}/>
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
