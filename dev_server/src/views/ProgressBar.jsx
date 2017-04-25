import React from 'react';
import ReactDOM from 'react-dom';

export default class ProgressBar extends React.Component {
  constructor() {
    super();
    this.state = {
      className: "nix",
      progress: 0
    }

    this.startAt = this.startAt.bind(this);
  }

  componentDidMount() {
    this.props.setStartAtHandle(this.startAt);
  }

  startAt(time) {
    var state = this.state;
    state.className = "nix";
    state.progress = -time;
    this.setState(state);
    this.forceUpdate();
    this.setState({className: "filling-bar"});
    console.log("Progressbar started, ", this.state.progress);
  }


  render() {
    var s = {
      animationDelay: String(this.state.progress) + "s"
    }

    return (
      <div id="progressWrapper">
        <div id="progress" className={ this.state.className } style={s}> </div>
      </div>
    );
  }
}
