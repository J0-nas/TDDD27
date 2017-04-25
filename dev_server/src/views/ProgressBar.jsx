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
    this.setState({progress: time-30});
    console.log("Progressbar started, ", this.state.progress);
  }


  render() {
    var s = {
      animationDelay: String(this.state.progress) + "s"
    }

    return (
      <div id="progressWrapper">
        <div id="progress" className="filling-bar" style={s}> </div>
      </div>
    );
  }
}
