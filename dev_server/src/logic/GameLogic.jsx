import React from 'react';
import ReactDOM from 'react-dom';

import GameServerConnection from './GameServerConnection.jsx';
import SocketConnection from './SocketConnection.jsx';
import SocketChannels from './SocketChannels.jsx';

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
      breakDurationSongs: 2,
      breakDurationGame: 4,
      artistSolved: false,
      titleSolved: false,
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

    //this.sleep = this.sleep.bind(this);
    this.startSong = this.startSong.bind(this);
    this.onSongEnd = this.onSongEnd.bind(this);
    this.processInput = this.processInput.bind(this);
    this.initViewConnection = this.initViewConnection.bind(this);
    this.loadFirstSong = this.loadFirstSong.bind(this);
    this.loadNewSong = this.loadNewSong.bind(this);
    this.songBreak = this.songBreak.bind(this);
    this.receive_standings = this.receive_standings.bind(this);

    this.serverConnection = new GameServerConnection();
    this.socketConnection = new SocketConnection(this.receive_standings);
    this.audioPlayer = new AudioPlayer(this.onSongEnd);
  }

  componentDidMount() {
    Promise.resolve(
        this.serverConnection.asyncGetCurrentGameState()
        .then(this.loadFirstSong, x => console.log("Could not load first song."))
    );

    this.serverConnection.asyncGetNextGameState().then(x=> console.log("Loaded next Game"), x=> console.log("Could not load next Game: ", x));

    this.socketConnection.connect();
    this.socketConnection.join_channel(SocketChannels.standingsChannel);
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
   * Starts a new Song. Expects current the server side information in this.state.artist/url/title/record
   */
  startSong() {
    if (this.state.currentSong.started) {
      console.log("song had already started");
      return;
    } else {
      console.log("Starting ", this.state.round, ". round");
    }

    //Many songs of Napster have the alternativ name or collaboration/album in the name of
    //artist or title. We remove them to make the game more simple
    var simpleArtist = this.state.currentSong.artist.replace(/(\[(.)+\])+/g, '');
    var simpleTitle = this.state.currentSong.title.replace(/(\[(.)+\])+/g, '');

    simpleArtist = simpleArtist.replace(/(\((.)*\))/g, '');
    simpleTitle = simpleTitle.replace(/(\((.)*\))/g, '');

    if (!simpleArtist.includes("feath")) {
      simpleArtist = simpleArtist.replace(/(feat(.)*)/g, '');
    }

    if (!simpleTitle.includes("feath")) {
      simpleTitle = simpleTitle.replace(/(feat(.)*)/g, '');
    }

    var aArray = simpleArtist.split(/[ ,]+/g).filter(w => w != "").map(toTAElement);
    var tArray = simpleTitle.split(/[ ,]+/g).filter(w => w != "").map(toTAElement);

    var newCSState = this.state.currentSong;
    newCSState.artistElementArray = aArray;
    newCSState.titleElementArray = tArray;
    newCSState.startTime = Date.now();

    newCSState.started = true;
    this.setState({currentSong: newCSState});

    var newArtistLabel = this.buildLabelString(this.state.currentSong.artistElementArray);
    var newTitleLabel = this.buildLabelString(this.state.currentSong.titleElementArray);

    //update the labels using the viewConnection
    this.viewConnection.updateATLabels(newArtistLabel, newTitleLabel);

    this.audioPlayer.playSongFrom(this.state.currentSong.url, newCSState.songStart);
    this.setState( {cssClassNameBar: "filling-bar"} );
    this.setState( {cssClassNameCounter: "filling-text"} );
    this.setState( {cssClassNameInput: "nix"} );
  }

  onSongEnd() {
    console.log("Round ", this.state.round, " ended");
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

    //expects the next song to be available
    this.loadNewSong();
  }

  songBreak() {
    this.viewConnection.songBreak(this.state.breakDuration, 0);
  }

  processInput(input) {
    if (!this.state.currentSong.active) {
      return;
    }

    this.setState( {cssClassNameInput: "nix"} );
    if (!this.state.currentSong.active) {
      return;
    }
    console.log("Process input: ", input);
    var t_c = false;
    var a_c = false;

    var nextState = this.state.currentSong;
    var check_a = checkInput(input, this.state.currentSong.artistElementArray);
    if (check_a[0]) {
      a_c = true;
      nextState.artistElementArray = check_a[1];
    }
    var check_t = checkInput(input, this.state.currentSong.titleElementArray);
    if (check_t[0]) {
      t_c = true;
      nextState.titleElementArray = check_t[1];
    }

    var a_s = checkIfSolved(check_a[1]);
    var t_s = checkIfSolved(check_t[1]);
    const time = Date.now() - this.state.currentSong.startTime;
    if (a_s && t_s) {
      console.log("Song was solved in: " + time + "ms. Send time to server.");
      nextState.active = false;
    }
    if (a_s && (!this.state.artistSolved) && (localStorage.getItem("username") != null)) {
      this.serverConnection.postArtistSolved(localStorage.getItem("username"), time);
      this.setState({artistSolved: true});
    }
    if (t_s && (!this.state.titleSolved) && (localStorage.getItem("username") != null)) {
      this.serverConnection.postTitleSolved(localStorage.getItem("username"), time);
      this.setState({titleSolved: true});
    }
    if (t_c || a_c) {
      var newArtistLabel = this.buildLabelString(check_a[1]);
      var newTitleLabel = this.buildLabelString(check_t[1]);
      this.viewConnection.updateATLabels(newArtistLabel, newTitleLabel);
      this.setState( {
        cssClassNameInput: "filling-correct",
        currentSong: nextState
      } );
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

  loadFirstSong() {
    this.loadNewSong();
    var songState = this.state.currentSong;
    var songStart = this.serverConnection.getTimeStamp();
    const date = Date.now();
    const diff = date - songStart;

    if (diff < 30*1000) {
      songState.songStart = diff/1000;
      this.setState({currentSong: songState});
      return this.startSong();
    } else if (diff > 30*1000) {
      var round = this.state.round;
      if (round < 9) {
        if (diff < (30+this.state.breakDurationSongs)*1000) {
          this.loadNewSong();
          songStart = (30+this.state.breakDurationSongs)*1000 - diff;
          setTimeout(this.startSong, songStart);
          return;
        } else {
          console.log("unexpected diff... load firstSong");
        }
      } else if (round == 9) {
        if (diff < (30+this.state.breakDurationGame)*1000) {
          this.loadNewSong();
          songStart = (30+this.state.breakDurationGame)*1000 - diff;
          setTimeout(this.startSong, songStart);
          return;
        } else {
          console.log("unexpected diff... load firstSong - round 9");
        }
      } else {
        console.log("illegal round count...");
      }
    } else {
      console.log("illegal first date...");
    }
  }

  loadNewSong() {
    var nextSong = this.serverConnection.pullSong();
    var currentSongState = {
      active: true,
      started: false,
      startTime: Date.now(),
      url: nextSong.url,
      songStart: 0,
      artist: nextSong.artist,
      title: nextSong.title,
      record: nextSong.record,
      artistElementArray: [],
      titleElementArray: []
    }
    this.setState({
      artistSolved: false,
      titleSolved: false,
      currentSong: currentSongState,
      round: nextSong.round
    });
    //console.log("loaded new song...");
  }

  receive_standings(standings) {
    console.log("GameLogic received standings: ", standings)
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
