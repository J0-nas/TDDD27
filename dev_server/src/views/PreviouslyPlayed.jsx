import React from 'react';
import ReactDOM from 'react-dom';

import { Grid, Row, Col } from 'react-bootstrap';

export default class PreviouslyPlayed extends React.Component {
  constructor() {
    super();
    /*this.state = {
      artist: "Artist",
      title: "Title",
      record_time: "Record_time",
      record_user: "Record_user"
    };*/
  }

    render() {
	var s = {
	    textAlign: "center",
	    width: "100%"
	}
	
    return (
	    <Grid style = {s}>
        <Row className="show-grid">
          <Col>
            <div>
              {this.props.title} by {this.props.artist}
            </div>
          </Col>
          <Col>
            Record: { this.props.rUser } in { this.props.rTime} ms. <br/>
	    { this.props.rDate }
          </Col>
        </Row>
      </Grid>
    );
  }
}
