import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import Standings from './Standings'
import GameView from './GameView'

export default class Content extends React.Component {
  constructor() {
    super();
    this.state  = {
      "content" : <Standings/>
    }
  }

  render() {
    return (
    <Grid className="mainContainer">
        <Row className="show-grid">
          <Col sm={12} md={6}>
            <GameView/>
          </Col>
          <Col sm={12} md={6}>
            {this.state.content}
          </Col>
        </Row>
    </Grid>
    );
  }
}
