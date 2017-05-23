import React from 'react';
import ReactDOM from 'react-dom';

import {Form, Modal, Button, FormControl, FormGroup} from 'react-bootstrap';

import UtilityServerConnection from './../logic/UtilityServerConnection.jsx';
import ResponseStatusCodes from './../logic/ResponseStatusCodes.jsx';

export default class RegisterView extends React.Component {
  constructor(){
    super();

    this.state = {
    	showModal: false,
    	passwd: "",
      passwdCheck: ""
    }
    this.serverConnection = new UtilityServerConnection();

    this.close = this.close.bind(this);
    this.handleResp = this.handleResp.bind(this);
    this.register = this.register.bind(this);
    this.handlePasswdChange = this.handlePasswdChange.bind(this);
    this.handlePasswdCheckChange = this.handlePasswdCheckChange.bind(this);
    this.getPassswdValidationState = this.getPassswdValidationState.bind(this);
    this.getPassswdCheckValidationState = this.getPassswdCheckValidationState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  	this.setState({showModal: nextProps.registerOpened});
    console.log("Register recieved", nextProps);
  }

  close() {
  	this.setState({showModal: false});
    this.props.closeHandler();
  }

  handleResp(dict) {
    if (Number(dict['status']) == ResponseStatusCodes.operationSuccess) {
      //logged in
      this.close()
    } else {
      console.log(Number(dict['status']), ResponseStatusCodes.operationSuccess, dict['value']);
    }
  }

  register() {
    const username = ReactDOM.findDOMNode(this.refs.usernameInput).value;
    const email = ReactDOM.findDOMNode(this.refs.emailInput).value;
    const passwd = ReactDOM.findDOMNode(this.refs.passwdInput).value;
    const passwdCheck = ReactDOM.findDOMNode(this.refs.passwdCheckInput).value;

    if (
      (username.length == 0) ||
      (email.length == 0) ||
      (passwd.length < 6) ||
      (passwdCheck.length < 6) ||
      (passwd != passwdCheck)) {
        return;
    }

    const resp  = this.serverConnection.registerRequest(username, email, passwd);
    resp.then(this.handleResp, x => console.log("could not parse json", x));
  }

  handlePasswdChange(e) {
    this.setState({passwd: e.target.value});
  }

  handlePasswdCheckChange(e) {
    this.setState({passwdCheck: e.target.value});
  }

  getPassswdValidationState() {
    const passwd = this.state.passwd;
    if (passwd.length >= 6) {
      return "success";
    } else if (length == 0) {
      return null;
    } else {
      return "warning";
    }
  }

  getPassswdCheckValidationState() {
    const passwd = this.state.passwd;
    const passwdCheck = this.state.passwdCheck;
    if ((passwd == passwdCheck) && (passwdCheck.length > 0)) {
      return "success";
    } else {
      return "warning";
    }
  }

  render() {
  	return (
  		<Modal show={this.state.showModal} onHide={this.close}>
  			<Modal.Header closeButton>
  				<Modal.Title>Register</Modal.Title>
  			</Modal.Header>

  			<Modal.Body>
  				<Form horizontal onSubmit={this.register}>
  					<FormGroup controlId="formHorizontalUsername">
  						<FormControl required type="text" placeholder="Username" ref="usernameInput"/>
  					</FormGroup>

  					<FormGroup controlId="formHorizontalEmail">
  						<FormControl required type="email" placeholder="Email" ref="emailInput"/>
  					</FormGroup>

  					<FormGroup controlId="formHorizontalPassword" validationState = {this.getPassswdValidationState()}>
  						<FormControl required type="password" placeholder="Password" ref="passwdInput" onChange={this.handlePasswdChange}/>
  						<FormControl.Feedback/>
  					</FormGroup>

  					<FormGroup controlId="formHorizontalPasswordCheck" validationState = {this.getPassswdCheckValidationState()}>
  						<FormControl required type="password" placeholder="repeat Password" ref="passwdCheckInput" onChange={this.handlePasswdCheckChange}/>
  						<FormControl.Feedback/>
  					</FormGroup>
  				</Form>
  			</Modal.Body>
  			<Modal.Footer>
  				<Button bsStyle="danger" onClick={this.close}>Close</Button>
  				<Button bsStyle="success" onClick={this.register}>Register</Button>
  			</Modal.Footer>
  		</Modal>
  	);
  }
}
