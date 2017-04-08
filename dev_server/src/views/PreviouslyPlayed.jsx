import React from 'react';
import ReactDOM from 'react-dom';

import { Grid, Row, Col } from 'react-bootstrap';

export default class PreviouslyPlayed extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: "Artist",
      title: "Title",
      record_time: "Record_time",
      record_user: "Record_user"
    };
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col>
            <div>
              {this.state.title} + " by " +  {this.state.artist}
            </div>
          </Col>
          <Col>
              "Record: " + {this.state.record_user} + " in " + {this.record_time} + "ms"
          </Col>
        </Row>
      </Grid>
    );
  }
}
