import React from 'react';
import ReactDOM from 'react-dom';

import ServerConnection from './ServerConnection.jsx';
import GameView from './../views/GameView.jsx';
import { toTAElement, checkInput, checkIfSolved } from './SolveLogic.jsx';

export default class GameLogic extends React.Component {
  constructor() {
    super();
    this.state = {
      nextSong: {
        url: "...",
        artist: "nextArtist",
        title: "nextTitle",
        record: {
          username: "next_r_userName",
          time: "next_t_19.56",
          date: "next_d_2132 : 12:49"
        }
      },
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
      }
    }

    this.startSong = this.startSong.bind(this);
    this.processInput = this.processInput.bind(this);
    this.initViewConnection = this.initViewConnection.bind(this);
    this.setNextSong = this.setNextSong.bind(this);
    this.loadNewSong = this.loadNewSong.bind(this);

    this.serverConnection = <ServerConnection nextSong={this.nextSong}/>
  }

  componentDidMount() {
    this.startSong();
  }

  initViewConnection(vC) {
    this.viewConnection = vC;
    return;
  }

  initServerConnection(sC) {
    this.serverConnection = cS;
    return;
  }

  /*
        Starts a new Song. Expects current the server side information in this.state.artist/url/title/record
        */
  startSong() {
    if (this.state.currentSong.started) {
      console.log("song had already started")
    }
    var aArray = this.state.currentSong.artist.split(/[ ,]+/g).map(toTAElement);
    var tArray = this.state.currentSong.title.split(/[ ,]+/g).map(toTAElement);

    var oldCSState = this.state.currentSong;
    oldCSState.artistElementArray = aArray;
    oldCSState.titleElementArray = tArray;
    oldCSState.startDate = Date.now();
    this.setState({currentSong: oldCSState});

    var newArtistLabel = this.buildLabelString(this.state.currentSong.artistElementArray);
    var newTitleLabel = this.buildLabelString(this.state.currentSong.titleElementArray);

    //update the labels using the viewConnection
    this.viewConnection.updateATLabels(newArtistLabel, newTitleLabel);

    //TODO
    var song = new Audio(this.state.currentSong.url);
    song.src = "http://listen.vo.llnwd.net/g3/5/4/8/1/7/1302071845.mp3";
    song.currentTime = this.state.currentSong.songStart;
    song.volume = 0.3;
    song.play();
  }

  processInput(input) {
    if (!this.state.currentSong.active) {
      return;
    }
    console.log("process input")
    var t_c = false;
    var a_c = false;
    var check = checkInput(input, this.state.currentSong.artistElementArray);
    if (check[0]) {
      a_c = true;
      var oldState = this.state.currentSong;
      oldState.artistElementArray = check[1];
      this.setState({currentSong: oldState});
    }
    var check = checkInput(input, this.state.currentSong.titleElementArray);
    if (check[0]) {
      t_c = true;
      var oldState = this.state.currentSong;
      oldState.titleElementArray = check[1];
      this.setState({currentSong: oldState});
    }

    var a_s = checkIfSolved(this.state.currentSong.artistElementArray);
    var t_s = checkIfSolved(this.state.currentSong.titleElementArray);
    if (a_s && t_s) {
      const time = Date.now() - this.state.currentSong.startDate;
      console.log("Song was solved in: " + time + " send time to server")
    }
    if (a_s) {}
    if (t_s) {}
    if (t_c || a_c) {
      var newArtistLabel = this.buildLabelString(this.state.currentSong.artistElementArray);
      var newTitleLabel = this.buildLabelString(this.state.currentSong.titleElementArray);
      this.viewConnection.updateATLabels(newArtistLabel, newTitleLabel);
    }
  }

  buildLabelString(taArray) {
    var wordArray = taArray.map(function(ta) {
      if (!ta.mustBeSolved || ta.hasBeenSolved) {
        return ta.word;
      }
      return "*".repeat(ta.length);
    });
    return wordArray.join(" ");
  }

  setNextSong(nextSongState) {
    this.setState({nextSong: nextSongState});
  }

  loadNewSong() {
    var nextSongState = this.state.nextSong;
    if (nextSongState == null) {
      console.log("Next song couldn't be loaded.");
      return;
    }
    var currentSongState = {
      active: true,
      started: false,
      startDate: 0,
      url: nextSongState.url,
      songStart: 0,
      artist: nextSongState.artist,
      title: nextSongState.title,
      record: nextSongState.record,
      artistElementArray: [],
      titleElementArray: []
    }
    nextSongState = null;
    this.setState({nextSong: nextSongState});
    this.setState({currentSong: currentSongState});
  }

  render() {
    return <GameView processInputHandle={this.processInput} initHande={this.initViewConnection}/>
  }
}
