import React from 'react';
import ReactDOM from 'react-dom';

export default class ProgressCounter extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 30*10
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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
        counter: this.state.counter - 1
      });
    }
  }


  render() {
    return (
      <div>
        ProgressCountersssss + {this.state.counter}
      </div>
    );
  }
}
