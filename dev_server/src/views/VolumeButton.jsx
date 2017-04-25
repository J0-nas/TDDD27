import React from 'react';
import ReactDOM from 'react-dom';

export default class VolumeView extends React.Component {
  render() {
    return (
      <i className="material-icons">
        { this.props.volume }
      </i>
    );
  }
}
