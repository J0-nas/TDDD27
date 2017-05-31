import React from 'react';

export default class AudioPlayer extends React.Component{
  constructor(onEnded) {
    super()
    this.state = {
      startHandles: []
    }

    this.audio = new Audio();
    this.audio.onended = onEnded;

    this.setVolume = this.setVolume.bind(this);
    this.pushStart = this.pushStart.bind(this);
    this.addHandle = this.addHandle.bind(this);
    this.playSongFrom = this.playSongFrom.bind(this);
  }

  setVolume(volume) {
    //console.log("set volume to ", volume);
    this.audio.volume = volume;
  }

  pushStart(start) {
    var startHandleState = this.state.startHandles;
    for (var i in startHandleState) {
      startHandleState[i](start);
    }
  }

  addHandle(handle) {
    var state = this.state;
    state.startHandles.push(handle);
    //this.setState(state);
  }

  playSongFrom(songURL, time) {
    this.audio.src = songURL;
    this.audio.currentTime = time;
    this.audio.play();
    this.pushStart(time);
  }
}
