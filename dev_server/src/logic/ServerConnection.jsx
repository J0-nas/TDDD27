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
    //this.baseUrl = "https://mousika.herokuapp.com"
    this.baseUrl = "http://localhost:4000"


    this.pullSong = this.pullSong.bind(this);
    this.getCurrentGameState = this.getCurrentGameState.bind(this);
    this.asyncGetCurrentGameState = this.asyncGetCurrentGameState.bind(this);
    this.syncGetCurrentGameState = this.syncGetCurrentGameState.bind(this);
    
    this.fetchAsyncGCGS_ResponseBody = this.fetchAsyncGCGS_ResponseBody.bind(this);
    this.handleAsyncGCGS_Response = this.handleAsyncGCGS_Response.bind(this);
  }

  componentDidMount() {}

  pullSong() {
    console.log("Pull state", this.state.game);
    var gs = this.state.game[this.state.currentSongNumber % 10];
    this.state.currentSongNumber += 1;
    return {url: gs.songUrl, artist: gs.artist, title: gs.title, record: this.state.dummy.record, songStart: 0}
  }

  handleAsyncGCGS_Response(response) {
    //console.log("resp", response);
    if (response.status == 200) {
      return response.json().then(this.fetchAsyncGCGS_ResponseBody);
    } else {
      console.log("Request error ", response);
      return Promise.reject(response);
    }
  }

  fetchAsyncGCGS_ResponseBody(blob) {
    console.log("blob", blob);
    this.state.game = blob.currentGame;
    this.state.currentSongNumber = blob.currentSong;
    this.state.timeStamp = blob.timeStamp;
    console.log("Response set to state:", this.state);
    
    return Promise.resolve("Done");
    /*this.setState({game: blob.currentGame});
    this.setState({currentSongNumber: blob.currentSong});
    this.setState({timeStamp: blob.timeStamp});*/
  }

  asyncGetCurrentGameState() {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var myInit = {
      method: 'GET',
      synchronous: true,
      headers: myHeaders
    };

    var myRequest = new Request(this.baseUrl + '/currentGame', myInit);

    return fetch(myRequest).then(this.handleAsyncGCGS_Response);
  }
  
  syncGetCurrentGameState() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = handleSyncGCGS;
    
    req.open("GET", this.baseUrl + "/currentGame", false)
  }
  
  getCurrentGameState(async=true) {
    if(async) {
      var r = this.asyncGetCurrentGameState();
    }
    console.log("Requested new game songs...");
    return r;
  }
}
