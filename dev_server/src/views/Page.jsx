import React from 'react';
import ReactDOM from 'react-dom';

import { Grid, Row, Col } from 'react-bootstrap';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import GameLogic from './../logic/GameLogic.jsx'
import Standings from './Standings.jsx'

export default class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      newScoreHandler: null,
      resetSolvedHandler: null
    }
    this.standingsCallback = this.standingsCallback.bind(this);
    this.resetSolved = this.resetSolved.bind(this);
    this.initStandings = this.initStandings.bind(this);
  }

  standingsCallback(value) {
    this.state.newScoreHandler(value);
  }

  resetSolved() {
    this.state.resetSolvedHandler();
  }

  initStandings(newScoreHandler, resetSolvedHandler) {
    this.setState({
      newScoreHandler: newScoreHandler,
      resetSolvedHandler: resetSolvedHandler
    });
  }

  render() {
    var s = {
        width: "100%",
    };
    return (
      <div id="Page" style={ s }>
        <Header/>
        <Grid className="mainContainer" >
          <Row className="show-grid">
            <Col sm={12} md={6}>
              <GameLogic standingsCallback = { this.standingsCallback } resetSolvedFromStandings = { this.resetSolved } />
            </Col>
            <Col id="Standings" className="glass" sm={12} md={6}>
              <Standings init = { this.initStandings } />
            </Col>
          </Row>
        </Grid>
        <Footer/>
      </div>
    );
  }
}
