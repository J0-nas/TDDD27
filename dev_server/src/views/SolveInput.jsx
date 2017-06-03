import React from 'react';
import ReactDOM from 'react-dom';

import {FormControl, FormGroup} from 'react-bootstrap';

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
    //console.log("submit input -", this.state.input);
    //console.log("e ", e.target.value);
    e.preventDefault();

    var inputField = ReactDOM.findDOMNode(this.refs.inputField);
    inputField.value = "";

    //Call GameViewCallback
    this.props.gvCB(this.state.input)
  }

  handleChange(e) {
    //console.log("change input - ", e.target.value);
    this.setState({input: e.target.value})
  }

  render() {
    const s = {
      textAlign: "center",
      marginLeft: "auto",
      marginRight: "auto",
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="userInputForm">
          <FormControl
            className = { this.props.onAnimationInputHandle }
            style={s} placeholder="Enter Title and Artist"
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus={true}
            ref="inputField"/>
        </FormGroup>
      </form>
    );
  }
}
