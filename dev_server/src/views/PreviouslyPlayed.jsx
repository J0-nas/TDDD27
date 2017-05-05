import React from 'react';
import ReactDOM from 'react-dom';

import {Grid, Row, Col, Button, Glyphicon} from 'react-bootstrap';

export default class PreviouslyPlayed extends React.Component {
    constructor() {
        super();
        /*this.state = {
      artist: "Artist",
      title: "Title",
      record_time: "Record_time",
      record_user: "Record_user"
    };*/
    this.state = {
        active: false,
        glyph: "star-empty"
    }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        var buttonActive = this.state.active;
        console.log(buttonActive);
        if (buttonActive == true) {
            this.setState({active: false});
            this.setState({glyph: "star-empty"});
        } else {
            this.setState({active: true});
            this.setState({glyph: "star"});
        }
    }


    render() {
        var s = {
            textAlign: "center",
            width: "100%"
        }
        // images are available: http://api.napster.com/v2.1/albums/Alb.54719066/images?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4
        return (
            <Grid style={s}>
                <Row id="previouslyPlayed" className="show-grid glass">
                    <Col id="albumCover" className="hidden-xs">
                    </Col>
                    <Col id="prevArtistTitle">
                        <Button id="LikeButton" bsSize="large" onClick={ this.handleClick } active={this.state.active}><Glyphicon glyph={ this.state.glyph } /></Button>

                        <span className="prevPlayed">{this.props.artist}
                        </span><br/>
                        <span className="prevPlayed">{this.props.title}</span>
                    </Col>
                    <Col id="Record">
                        <span>
                            Record: {this.props.rTime} ms by {this.props.rUser}
                        </span> <br/>
                        <span>
                            Unbroken since {this.props.rDate}.
                        </span>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
