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
      currentSong: {
        active: true,
        started: true,
        startDate: 0,
        url: "http://listen.vo.llnwd.net/g3/7/8/8/1/2/1322321887.mp3",
        songStart: 0,
        artist: "Badbadnotgood",
        title: "Time Moves Slow (feat. Sam Herring)",
        record: {
          userName: "User",
          time: "15.32",
          date: "1.2.2021 : 15:46"
        },
        artistElementArray: [],
        titleElementArray: []
      },

      textBox: {
        artist: "***",
        title: "*****"
      },

      previouslyPlayed: {
        artist: "Artist",
        title: "Title",
        record: {
          userName: "User",
          time: "5.145",
          date: "1.1.2015 : 21:13"
        }
      }
    };

    this.inputSubmitCallback = this.inputSubmitCallback.bind(this);
    this.updateATLabels = this.updateATLabels.bind(this);
  }

  componentDidMount() {
    this.props.initHande({
      updateATLabels: this.updateATLabels
    })
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
      backgroundColor: "rgba(100,100,100,0.5)",
      marginRight: "0px",
      width: "100%"
    }

    return (
      <Grid style={s}>
        <VolumeView callback={ this.props.volumeCallback }/>
        <ProgressCounter setStartAtHandle={ this.props.addStartHandle } name="PC"/>

        <TextBox artist={this.state.textBox.artist} title={this.state.textBox.title}/>
        <SolveInput gvCB={this.inputSubmitCallback}/>
        <PreviouslyPlayed artist={this.state.previouslyPlayed.artist} title={this.state.previouslyPlayed.title} rUser={this.state.previouslyPlayed.record.userName} rTime={this.state.previouslyPlayed.record.time} rDate={this.state.previouslyPlayed.record.date}/>
      </Grid>
    );
  }
}
