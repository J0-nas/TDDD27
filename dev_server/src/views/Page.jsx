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
      content: <Standings/>
    }
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
              <GameLogic/>
            </Col>
            <Col id="Standings" className="glass" sm={12} md={6}>
              {this.state.content}
            </Col>
          </Row>
        </Grid>
        <Footer/>
      </div>
    );
  }
}
