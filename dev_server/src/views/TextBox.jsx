import React from 'react';
import ReactDOM from 'react-dom';

export default class TextBox extends React.Component {
  constructor() {
    super()
    this.state = {
      s: {
        textAlign: "center"
      }
    }
  }
  render() {
    return (
      <div style={this.state.s}>
        {this.props.artist}
        <br/> {this.props.title}
      </div>
    );
  }
}
