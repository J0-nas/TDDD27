import React from 'react';
import ReactDOM from 'react-dom';

import { Table, Glyphicon } from 'react-bootstrap';

export default class Standings extends React.Component {
  constructor() {
    super();
    this.state = {
      scores: []
    }

    this.handleNewScore = this.handleNewScore.bind(this);
    this.resetSolved = this.resetSolved.bind(this);
  }

  resetSolved() {
    var state = this.state.scores;
    state = state.map(x => { return {username: x.username, points: x.points, artistSolved: false, titleSolved: false, time: 0}; } );
    this.setState(state);
    console.log("Standings state ", state);
  }

  handleNewScore(value) {
    const username = value.username;
    var state = this.state.scores;
    for (var i in state) {
      if (state[i].username == username) {
        state[i] = value;
        state.sort((x, y) => x.points > x.points);
        this.setState(state);
        console.log("Standings state ", state);
        return;
      }
    }
    state.push(value);
    state.sort((x, y) => x.points > x.points);
    this.setState(state);
    console.log("Standings state ", state);
  }

  componentDidMount() {
    this.props.init( this.handleNewScore, this.resetSolved );
  }

  render() {
    return (
      <Table responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Points</th>
        <th>Artist</th>
        <th>Title</th>
        <th>Time</th>
        <th className="hidden-md hidden-ms hidden-xs"></th>
      </tr>
    </thead>
    <tbody>
      {
        this.state.scores.map( (x, i) =>
          {
            var as = <Glyphicon glyph='remove'/>;
            var ts = <Glyphicon glyph='remove'/>;
            if (x.artistSolved) {
              as = <Glyphicon glyph='ok'/>
            }
            if (x.titleSolved) {
              ts = <Glyphicon glyph='ok'/>
            }

            return (
              <tr>
                <td>{i+1}</td>
                <td>{x.username}</td>
                <td>{x.points}</td>
                <td>{as}</td>
                <td>{ts}</td>
                <td>{x.time} ms</td>
                <th className="hidden-md hidden-ms hidden-xs"></th>
              </tr>
            )
          }
        )
      }
    </tbody>
  </Table>
    );
  }
}
