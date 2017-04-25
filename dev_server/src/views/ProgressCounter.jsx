import React from 'react';
import ReactDOM from 'react-dom';

export default class ProgressCounter extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 30,
      interval: 30
    };
    this.startAt = this.startAt.bind(this);
    this.renderCounter = this.renderCounter.bind(this);
  }

  componentDidMount() {
    this.timer = null;
    this.props.setStartAtHandle(this.startAt)
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startAt(time) {
    this.setState({counter: 30-time});
    this.setState({interval: -time});
    this.timer = setInterval(() => this.tick(), 100);
    console.log("Counter started, ", this.state.counter);
  }

  tick() {
    var s = this.state.counter - 0.1;
    if (s <= 0) {
      this.setState({
        counter: 0
      });
      clearInterval(this.timer);
    } else {
      this.setState({
        counter: s
      });
    }
    //console.log("new state ", this.state.counter)
  }

  renderCounter() {
    var counter = this.state.counter;
    var pre = Math.floor(counter/10);
    var post = counter % 10;
    return String(pre) + "." + String(post)
  }


  render() {
    var s = {
      animationDelay: String(this.state.interval) + "s"
    }
    return (
      <div id="timer" className="filling-text" style={s}> { Math.ceil(this.state.counter) } </div>
    );
  }
}
