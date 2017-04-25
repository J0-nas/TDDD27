import React from 'react';
import ReactDOM from 'react-dom';

//import VolumeButton from './VolumeButton.jsx';

export default class VolumeView extends React.Component {
  constructor() {
    super();
    this.volumeIcons = {
      up: "volume_up",
      down: "volume_down",
      muted: "volume_muted"
    }
    this.state = {
      volumeIcon: this.volumeIcons.up,
      volume: 0.5,
      muted: false,
      mouseDown: false
    }

    this.chooseIcon = this.chooseIcon.bind(this);
    this.clamp = this.clamp.bind(this);
    this.getP = this.getP.bind(this);
    this.changeVolumeBar = this.changeVolumeBar.bind(this);
    this.handleMuteOnClick = this.handleMuteOnClick.bind(this);
    this.handleVolumeBarMouseDown = this.handleVolumeBarMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.volumeCallback = this.volumeCallback.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  volumeCallback() {
    if (this.state.muted) {
      this.props.callback(0);
    } else {
      this.props.callback(this.state.volume);
    }
  }

  handleMouseMove(e) {
    if (!this.state.mouseDown) return;
    this.changeVolumeBar(e);
  }

  handleMouseUp(e) {
    if (!this.state.mouseDown) return;
    var state = this.state;
    state.mouseDown = false;
    this.setState(state);
  }

  chooseIcon(volume) {
    if (volume < 0.5) {
      return this.volumeIcons.down;
    } else {
      return this.volumeIcons.up;
    }
  }

  clamp(min, val, max) {
      return Math.min(Math.max(min, val), max);
  }

  getP(clientX, vbOffset, vbWidth) {
    var p = (clientX - vbOffset) / vbWidth;
    p = this.clamp(0, p, 1);
    return p;
  }

  handleMuteOnClick() {
    var state = this.state;
    if (state.muted) {
      state.muted = false;
      state.volumeIcon = this.chooseIcon(state.volume);
    } else {
      state.muted = true;
      state.volumeIcon = this.volumeIcons.muted;
    }
    this.setState(state);
    this.volumeCallback();
  }

  handleVolumeBarMouseDown(e) {
    var state = this.state
    state.mouseDown = true;
    this.setState(state);
    this.changeVolumeBar(e);
    this.volumeCallback();
  }

  changeVolumeBar(e) {
    let volumeBar = document.querySelector('.volume-bar');
    const volumeBarWidth = volumeBar.clientWidth;
    var bc = volumeBar.getBoundingClientRect();
    const volumeBarPosX = bc.left;
    //console.log(e.clientX, volumeBarPosX, volumeBarWidth);

    var state = this.state;
    const p = this.getP(e.clientX, volumeBarPosX, volumeBarWidth);
    state.volume = p;
    state.volumeIcon = this.chooseIcon(p);
    this.setState(state);
    this.volumeCallback();
  }

  render() {
    var s = {
      width: String(this.state.volume * 100) +"%"
    }
    return (
      <div className="audio-player">
        <button className="mute" onClick={ this.handleMuteOnClick }>
          <i className="material-icons">
            { this.state.volumeIcon }
          </i>
        </button>
        <div className="volume-bar" onMouseDown={ this.handleVolumeBarMouseDown }
          >
          <div className="fill" style={ s }></div>
          <div className="handle"></div>
        </div>
      </div>
    );
  }
}
