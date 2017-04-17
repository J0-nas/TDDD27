import React from 'react';
import ReactDOM from 'react-dom';

import { FormControl, FormGroup } from 'react-bootstrap';

export default class SolveInput extends React.Component {
    constructor() {
	super()
	this.state = {
	    input: "nothing"
	}
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleChange = this.handleChange.bind(this);
    }
    
    handleSubmit(e) {
	console.log("submit input -", this.state.input);
	e.preventDefault();
    }

    handleChange(e) {
	console.log("change input - ", e.target.value);
	this.setState({input: e.target.value})
	//console.log(this.state);
    }

    render() {
	const s = {
	    textAlign: "center"
	}
	
	return (
		<form onSubmit= { this.handleSubmit }>
		<FormGroup controlId="userInputForm">
		<FormControl style={s} placeholder="Enter Title and Artist" onChange={ this.handleChange }/>
		</FormGroup>
		</form>
	);
  }
}
