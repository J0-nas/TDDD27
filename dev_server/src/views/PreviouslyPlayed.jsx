import React from 'react';
import ReactDOM from 'react-dom';

import {Grid, Row, Col} from 'react-bootstrap';

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
        // images are available: http://api.napster.com/v2.1/albums/Alb.54719066/images?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4
        return (
            <Grid style={s}>
                <Row id="previouslyPlayed" className="show-grid">
                    <Col id="albumCover" className="hidden-xs">
                    </Col>
                    <Col id="prevArtistTitle">
                        <span className="prevPlayed">{this.props.artist}
                        </span><br/>
                        <span className="prevPlayed">{this.props.title}</span>
                    </Col>
                    <Col id="Like">
                        <i className="material-icons">star</i>
                            <i className="material-icons">star_border</i>

                    </Col>
                    <Col id="Record">
                        <span>
                            Record: {this.props.rTime} ms
                        </span> <br/>
                        <span>
                            by {this.props.rUser}
                        </span> <br/>
                        <span>
                            on {this.props.rDate}
                        </span>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
