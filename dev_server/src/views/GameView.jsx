import React from 'react';
import ReactDOM from 'react-dom';

import ProgressBar from './ProgressBar.jsx';
import ProgressCounter from './ProgressCounter.jsx';
import VolumeView from './VolumeView.jsx';
import TextBox from './TextBox.jsx';
import SolveInput from './SolveInput.jsx';
import PreviouslyPlayed from './PreviouslyPlayed.jsx';
import GameLogic from './../logic/GameLogic.jsx';

import {Grid} from 'react-bootstrap';

export default class GameView extends React.Component {
  constructor() {
    super();

    this.state = {
      textBox: {
        artist: "***",
        title: "*****"
      }
    };

    this.inputSubmitCallback = this.inputSubmitCallback.bind(this);
    this.updateATLabels = this.updateATLabels.bind(this);
    this.songBreak = this.songBreak.bind(this);
  }

  componentDidMount() {
    this.props.initHande({
      updateATLabels: this.updateATLabels,
      songBreak: this.songBreak
    })
  }

  songBreak(duration, type) {
    console.log("break of type ", type, " for ", duration);
  }

  inputSubmitCallback(input) {
    console.log("GV recieved: ", input);
    this.props.processInputHandle(input);
  }

  updateATLabels(newArtistLabel, newTitleLabel) {
    var labelState = this.state.textBox;
    labelState.artist = newArtistLabel;
    labelState.title = newTitleLabel;
    this.setState({textBox: labelState});
  }

  render() {
    var s = {
      //backgroundColor: "rgba(100,100,100,0.5)",
      backgroundColor: "grey",
      marginRight: "0px",
      width: "100%"
    }

    return (
      <Grid style={s}>
        <VolumeView callback={ this.props.volumeCallback }/>
        <ProgressCounter setStartAtHandle={ this.props.addStartHandle }/>

        <TextBox artist={this.state.textBox.artist} title={this.state.textBox.title}/>
        <SolveInput gvCB={this.inputSubmitCallback}/>
        <ProgressBar setStartAtHandle= { this.props.addStartHandle }/>
        <PreviouslyPlayed artist={this.props.previouslyPlayed.artist} title={this.props.previouslyPlayed.title} rUser={this.props.previouslyPlayed.record.userName} rTime={this.props.previouslyPlayed.record.time} rDate={this.props.previouslyPlayed.record.date}/>
      </Grid>
    );
  }
}
