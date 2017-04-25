import React from 'react';
import ReactDOM from 'react-dom';

export default class ProgressCounter extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 30
    };
    this.startAt = this.startAt.bind(this);
  }

  componentDidMount() {
    this.timer = null;
    this.props.setStartAtHandle(this.startAt)
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startAt(time) {
    console.log("Counter started");
    this.setState({counter: time});
    this.timer = setInterval(() => this.tick(), 100);
  }

  tick() {
    //console.log(this.state);
    var s = this.state.counter;
    if (s <= 0) {
      /*this.setState({
        counter: 30*10
      });*/
      clearInterval(this.timer);
      this.timer = null
    } else {
      this.setState({
        counter: this.state.counter - 0.1
      });
    }
  }



  render() {
    return (
      <div id="timer"> { this.state.counter } </div>
    );
  }
}
