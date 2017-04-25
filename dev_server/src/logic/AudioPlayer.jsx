import React from 'react';

export default class AudioPlayer extends React.Component{
  constructor() {
    super()
    this.state = {
      startHandles: []
    }
    this.setVolume = this.setVolume.bind(this);
    this.pushStart = this.pushStart.bind(this);
    this.addHandle = this.addHandle.bind(this);
  }

  setVolume(volume) {
    console.log("set volume to ", volume);
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
    console.log("oldState", this.state);
    //this.setState(state);
    console.log("newState", this.state);
  }
}
