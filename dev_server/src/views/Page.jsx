import React from 'react';
import ReactDOM from 'react-dom';

import { Grid, Row, Col } from 'react-bootstrap';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import GameLogic from './../logic/GameLogic.jsx'
import Standings from './Standings.jsx'

//var background = require('url-loader?mimetype=image/jpg!./../images/bg_2.jpg')

export default class Page extends React.Component {
  constructor() {
    super();

    this.state = {
      content: <Standings/>
    }
  }

  componentDidMount() {
    /*var gv = this.state.GameView;
    var gl = this.state.GameLogic;
    console.log(gl);
    gl.initViewConnection({
      updateATLabels: gv.updateATLabels
    });
    gv.initGLConnection({
      processInput: gl.processInput
    });

    var sb = this.state.ScoreBoard;
    this.setState({
      content: sb,
      GameLogic: gl,
      GameView: gv
    });*/

  }

  render() {
    var s = {
      //"backgroundColor": "green"
    };
    return (
      <div id="Page">
        <Header/>
        <Grid className="mainContainer" style={s}>
          <Row className="show-grid">
            <Col sm={12} md={5}>
              <GameLogic/>
            </Col>
            <Col sm={12} md={6}>
              {this.state.content}
            </Col>
            <Col sm={12} md={1}>
                <Footer/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
    /*
    var s = {
      backgroundImage: 'url(' + background + ')',
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    }
    console.log(background);
    //console.log(s, this.props.bg)
    console.log(background.split("\n").length)
    console.log("ds \n sdg".match(/'\n'/))
    */
  }
}
