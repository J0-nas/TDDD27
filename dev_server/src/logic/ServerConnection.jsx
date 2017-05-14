// import React from 'react';
// import ReactDOM from 'react-dom';

export default class ServerConnection {
  constructor() {
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
    this.csrf_token = ""

    this.state.attempts = 0;

    this.pullSong = this.pullSong.bind(this);
    this.getCurrentGameState = this.getCurrentGameState.bind(this);
    this.asyncGetCurrentGameState = this.asyncGetCurrentGameState.bind(this);

    this.set_csrf_token = this.set_csrf_token.bind(this);
    this.handle_set_csrf_token_Response = this.handle_set_csrf_token_Response.bind(this);
    this.fetch_set_csrf_token_ResponseBody = this.fetch_set_csrf_token_ResponseBody.bind(this);

    this.fetchAsyncGCGS_ResponseBody = this.fetchAsyncGCGS_ResponseBody.bind(this);
    this.handleAsyncGCGS_Response = this.handleAsyncGCGS_Response.bind(this);
  }

  //componentDidMount() {}
  handle_set_csrf_token_Response(response) {
    if (response.status == 200) {
      return response.text().then(this.fetch_set_csrf_token_ResponseBody);
    } else {
      console.log("Error in handle init response: ", response);
      return Promise.reject(response);
    }
  }

  fetch_set_csrf_token_ResponseBody(blob) {
    this.csrf_token = blob;
    console.log(this.csrf_token)
    return Promise.resolve(true);
  }

  set_csrf_token() {
    var myInit = {
      method: 'GET'
    };
    var myRequest = new Request(this.baseUrl + '/get_csrf_token', myInit);

    return fetch(myRequest).then(this.handle_set_csrf_token_Response);
  }

   pullSong() {
    console.log("Pull state", this.state.game);
    var gs = this.state.game[this.state.currentSongNumber % 10];
    this.state.currentSongNumber += 1;
    return {url: gs.songUrl, artist: gs.artist, title: gs.title, record: this.state.dummy.record, songStart: 0}
  }

   getTimeStamp() {
    return this.state.timeStamp;
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

    return Promise.resolve(true);
    /*this.setState({game: blob.currentGame});
    this.setState({currentSongNumber: blob.currentSong});
    this.setState({timeStamp: blob.timeStamp});*/
  }

   asyncGetCurrentGameState() {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var myInit = {
      method: 'GET',
      headers: myHeaders
    };

    var myRequest = new Request(this.baseUrl + '/currentGame', myInit);

    return fetch(myRequest).then(this.handleAsyncGCGS_Response);
  }

   getCurrentGameState() {
    var r = this.asyncGetCurrentGameState();

    console.log("Requested new game songs...");
    return r;
  }

  handlePostRequest(response) {
    console.log(response)
    if (response.status == 403) {      
      this.state.attempts = this.state.attempts+1;
      if (this.state.attempts < 10) {
	//console.log(Response);
	return this.set_csrf_token().then(x => Promise.reject(false));
      }
      return Promise.resolve(true);
    } else if (response.status == 200) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(response);
    }
  }

  postArtistSolved(id, time) {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("x-csrf-token", this.csrf_token);

    //console.log("send request with header ", myHeaders, myHeaders.get('x-csrf-token'));

    var body = new FormData();
    body.append("id", id);
    body.append("time", time);

    var myInit = {
      method: 'POST',
      headers: myHeaders,
      body: body
    };
    var myRequest = new Request(this.baseUrl + '/artistSolved', myInit);
    console.log(myRequest);
    
    return fetch(myRequest).then(this.handlePostRequest)
      .then(x => console.log(x));//, this.postArtistSolved(id, time));
  }

  postTitleSolved(id, time) {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("x-csrf-token", this.csrf_token);

    //console.log("send request with header ", myHeaders, myHeaders.get("x-csrf-token"));

    var body = new FormData();
    body.append("id", id);
    body.append("time", time);

    var myInit = {
      method: 'POST',
      headers: myHeaders,
      body: body
    };
    var myRequest = new Request(this.baseUrl + '/titleSolved', myInit);
    console.log(myRequest);
    
    return fetch(myRequest).then(this.handlePostRequest)
      .then(x => console.log(x));//, this.postTitleSolved(id, time));
  }
}
