import React from 'react';
import ReactDOM from 'react-dom';

import ServerConnection from './ServerConnection.jsx';
import GameView from './../views/GameView.jsx';
import AudioPlayer from './AudioPlayer.jsx';
import {toTAElement, checkInput, checkIfSolved} from './SolveLogic.jsx';

export default class GameLogic extends React.Component {
  constructor() {
    super();
    this.state = {
      cssClassNameBar: "nix",
      cssClassNameCounter: "nix",
      cssClassNameInput: "nix",
      round: 0,
      breakDuration: 2,
      currentSong: {
        active: true,
        started: true,
        startTime: 0,
        urll:"",
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
      previouslyPlayed: {
        artist: "Artist",
        title: "Title",
        record: {
          userName: "User",
          time: "5.145",
          date: "1.1.2015 : 21:13"
        }
      }
    }

    this.sleep = this.sleep.bind(this);
    this.startSong = this.startSong.bind(this);
    this.onSongEnd = this.onSongEnd.bind(this);
    this.processInput = this.processInput.bind(this);
    this.initViewConnection = this.initViewConnection.bind(this);
    this.loadNewSong = this.loadNewSong.bind(this);
    this.songBreak = this.songBreak.bind(this);

    this.serverConnection = new ServerConnection();
    this.audioPlayer = new AudioPlayer(this.onSongEnd);

    //console.log(this.audioPlayer.addHandle);
    //console.log(this.audioPlayer);
  }

  componentDidMount() {
    Promise.resolve(this.serverConnection.getCurrentGameState()).
      then((this.loadNewSong)).
      then((this.startSong));
    //this.loadNewSong();
    //this.startSong();
  }

  initViewConnection(vC) {
    this.viewConnection = vC;
    return;
  }

  initServerConnection(sC) {
    this.serverConnection = cS;
    return;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /*
   * Starts a new Song. Expects current the server side information in this.state.artist/url/title/record
   */
  startSong() {
    if (this.state.currentSong.started) {
      console.log("song had already started")
    } else {
      console.log("Starting new song...")
    }
    
    this.setState( {cssClassNameBar: "filling-bar"} )
    this.setState( {cssClassNameCounter: "filling-text"} )
    this.setState( {cssClassNameInput: "nix"} )

    //Many songs of Napster have the alternativ name or collaboration/album in the name of
    //artist or title. We remove them to make the game more simple
    var simpleArtist = this.state.currentSong.artist.replace(/(\[(.)+\])+/g, '');
    var simpleTitle = this.state.currentSong.title.replace(/(\[(.)+\])+/g, '');
    //var aArray = this.state.currentSong.artist.split(/[ ,]+/g).map(toTAElement);
    //var tArray = this.state.currentSong.title.split(/[ ,]+/g).map(toTAElement);
    var aArray = simpleArtist.split(/[ ,]+/g).map(toTAElement);
    var tArray = simpleTitle.split(/[ ,]+/g).map(toTAElement);

    var oldCSState = this.state.currentSong;
    oldCSState.artistElementArray = aArray;
    oldCSState.titleElementArray = tArray;
    oldCSState.startTime = Date.now();
    this.setState({currentSong: oldCSState});

    var newArtistLabel = this.buildLabelString(this.state.currentSong.artistElementArray);
    var newTitleLabel = this.buildLabelString(this.state.currentSong.titleElementArray);

    //update the labels using the viewConnection
    this.viewConnection.updateATLabels(newArtistLabel, newTitleLabel);

    this.audioPlayer.playSongFrom(this.state.currentSong.url, 0);
  }

  onSongEnd() {
    console.log("Song Ended");
    var currentSongState = this.state.currentSong;
    currentSongState.active = false;

    var previouslyPlayedState = this.state.previouslyPlayed;
    previouslyPlayedState.artist = currentSongState.artist;
    previouslyPlayedState.title = currentSongState.title;
    previouslyPlayedState.record = currentSongState.record;
    this.setState({previouslyPlayed: previouslyPlayedState})
    this.setState( {cssClassNameBar: "nix"} )
    this.setState( {cssClassNameCounter: "nix"} )

    //Set Gameview to break view
    this.songBreak();
    //Start next song after the break
    setTimeout(this.startSong, 1000*this.state.breakDuration);

    //await sleep(1000*this.state.breakDuration);

    //expects the next song to be available
    this.loadNewSong();
  }

  songBreak() {
    this.viewConnection.songBreak(this.state.breakDuration, 0);
  }

  processInput(input) {
      this.setState( {cssClassNameInput: "nix"} )
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
      const time = Date.now() - this.state.currentSong.startTime;
      console.log("Song was solved in: " + time + " send time to server")
    }
    if (a_s) {}
    if (t_s) {}
    if (t_c || a_c) {
      var newArtistLabel = this.buildLabelString(this.state.currentSong.artistElementArray);
      var newTitleLabel = this.buildLabelString(this.state.currentSong.titleElementArray);
      this.viewConnection.updateATLabels(newArtistLabel, newTitleLabel);
      this.setState( {cssClassNameInput: "filling-correct"} )
    } else {
        if (this.state.cssClassNameInput == "filling-error-even") {
            this.setState( {cssClassNameInput: "filling-error-odd"} )
        } else {
            this.setState( {cssClassNameInput: "filling-error-even"} )
        }
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

  loadNewSong() {
    var nextSong = this.serverConnection.pullSong();
    var currentSongState = {
      active: true,
      started: false,
      startTime: Date.now(),
      url: nextSong.url,
      songStart: nextSong.start,
      artist: nextSong.artist,
      title: nextSong.title,
      record: nextSong.record,
      artistElementArray: [],
      titleElementArray: []
    }
    this.setState({currentSong: currentSongState});
    console.log("loaded new song...");
  }

  render() {
    return <GameView
        previouslyPlayed={ this.state.previouslyPlayed }
        processInputHandle={this.processInput}
        initHande={this.initViewConnection}
        volumeCallback={this.audioPlayer.setVolume}
        addStartHandle={this.audioPlayer.addHandle}
        AnimationBarHandle = { this.state.cssClassNameBar }
        AnimationCounterHandle = { this.state.cssClassNameCounter }
        AnimationInputHandle = { this.state.cssClassNameInput }
        />
  }
}
