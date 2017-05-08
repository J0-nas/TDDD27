import React from 'react';
import ReactDOM from 'react-dom';

export default class ProgressBar extends React.Component {
  constructor() {
    super();
    this.state = {
      progress: 0
    }

    this.startAt = this.startAt.bind(this);
  }

  componentDidMount() {
    this.props.setStartAtHandle(this.startAt);
  }

  startAt(time) {
    var state = this.state;
    state.progress = -time;
    this.setState(state);
    console.log("Progressbar started, ", state.progress);
  }

  render() {
    var s = {
      animationDelay: String(this.state.progress) + "s"
    }

    return (
      <div id="progressWrapper">
        <div id="progress" className={ this.props.onAnimationBarHandle } style={s}> </div>
      </div>
    );
  }
}
