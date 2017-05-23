import React from 'react';
import ReactDOM from 'react-dom';

import {Form, Modal, Button, FormControl, FormGroup} from 'react-bootstrap';

export default class RegisterView extends React.Component {
  constructor(){
    super();

    this.state = {
    	showModal: false,
    	passwd: ""
    }

    this.close = this.close.bind(this);
    this.register = this.register.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  	//this.setState({showModal: nextProps.opened});
  }

  close() {
  	this.setState({showModal: false});
  }

  register() {
  	console.log("success");
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
  						<FormControl type="text" placeholder="Username" ref="usernameInput"/>
  					</FormGroup>

  					<FormGroup controlId="formHorizontalEmail">
  						<FormControl type="email" placeholder="Email" ref="emailInput"/>
  					</FormGroup>

  					<FormGroup controlId="formHorizontalPassword">
  						<FormControl type="password" placeholder="Password" ref="passwdInput" onChange={this.handlePASSWDChange}/>
  						<FormControl.Feedback/>
  					</FormGroup>

  					<FormGroup controlId="formHorizontalPasswordCheck">
  						<FormControl type="password" placeholder="repeat Password" ref="passwdCheckInput" onChange={this.handlePASSWDChange}/>
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
