import React from 'react';
import ReactDOM from 'react-dom';

export default class VolumeView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.muteButton = document.querySelector('button.mute');
    this.muteButtonIcon = muteButton.querySelector('i');
    this.volumeBar = document.querySelector('.volume-bar');
    this.fillBar = volumeBar.querySelector('.fill');
    this.mouseDown = false;

    if (
      (!this.muteButton) ||
      (!this.muteButtonIcon) ||
      (!this.volumeBar) ||
      (!this.fillBar)
    ) {
      alert('Missing volume Component');
    }
  }

  render() {
    return (
      <div className="audio-player">
        <button className="mute">
          <i className="material-icons">volume_up</i>
        </button>
        <div className="volume-bar">
          <div className="fill"></div>
          <div className="handle"></div>
        </div>
      </div>
    );
  }
}
