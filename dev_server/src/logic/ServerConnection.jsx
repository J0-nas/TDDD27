import React from 'react';
import ReactDOM from 'react-dom';

export default class ServerConnection extends React.Component {
  constructor() {
    super();
    this.state = {
      game: [],
      nextSong: {
        url: "...",
        artist: "nextArtist",
        title: "nextTitle",
        record: {
          userName: "next_r_userName",
          time: "next_t_19.56",
          date: "next_d_2132 : 12:49"
        },
        songStart: 0
      },
      dummy: {
        started: false,
        url: "http://listen.vo.llnwd.net/g1/8/5/8/8/2/246028858.mp3",
        artist: "Drake",
        title: "Fireworks featuring Alicia Keys (Album Version (Edited))",
        record: {
          userName: "MaxMustermann",
          time: "00.01",
          date: "32.02.2018"
        },
        songStart: 0
      }
    }
    this.baseUrl = "https://damp-ridge-15871.herokuapp.com"
    //this.baseUrl = "localhost:4000"


    this.pullSong = this.pullSong.bind(this);
    this.getCurrentGameState = this.getCurrentGameState.bind(this);
    this.fetchResponseBody = this.fetchResponseBody.bind(this);
    this.handleRequestResponse = this.handleRequestResponse.bind(this);
  }

  componentDidMount() {}

  pullSong() {
    var gs = this.state.game[this.state.currentSongNumber % 10];
    this.state.currentSongNumber += 1;
    return {url: gs.songUrl, artist: gs.artist, title: gs.title, record: this.state.dummy.record, songStart: 0}
  }

  handleRequestResponse(response) {
    console.log("resp", response);
    if (response.status == 200) {
      response.json().then(this.fetchResponseBody);
    } else {
      console.log("Request error ", response);
    }
  }

  fetchResponseBody(blob) {
    console.log("JSON: ", blob);
    this.state.game = blob.currentGame;
    this.state.currentSongNumber = blob.currentSong;
    this.state.timeStamp = blob.timeStamp;
    /*this.setState({game: blob.currentGame});
    this.setState({currentSongNumber: blob.currentSong});
    this.setState({timeStamp: blob.timeStamp});*/
  }

  getCurrentGameState() {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var myInit = {
      method: 'GET',
      headers: myHeaders
    };

    var myRequest = new Request(this.baseUrl + '/currentGame', myInit);

    fetch(myRequest).then(this.handleRequestResponse);
  }
}
