import ServerConnection from './ServerConnection.jsx'

export default class GameServerConnection extends ServerConnection {
  constructor() {
    super();
    this.state = {
      game: [],
      dummy: {
        record: {
          userName: "userName",
          time: "0.0.0.1",
          date: "32.3.2031"
        }
      }
    }
    this.pullSong = this.pullSong.bind(this);
    this.getCurrentGameState = this.getCurrentGameState.bind(this);
    this.asyncGetCurrentGameState = this.asyncGetCurrentGameState.bind(this);

    this.fetchAsyncGCGS_ResponseBody = this.fetchAsyncGCGS_ResponseBody.bind(this);
    this.handleAsyncGCGS_Response = this.handleAsyncGCGS_Response.bind(this);
  }

  pullSong() {
    var gs = this.state.game[this.state.currentSongNumber % 10];
    this.state.currentSongNumber += 1;
    console.log("Pull state: ", gs, " ", this.state.currentSongNumber, ". round");
    if (this.state.currentSongNumber == 10) {
      getCurrentGameState();
      this.state.currentSongNumber = 0;
    }
    return {url: gs.songUrl, artist: gs.artist, title: gs.title, record: this.state.dummy.record, songStart: 0}
  }

  getTimeStamp() {
    return this.state.timeStamp;
  }

  handleAsyncGCGS_Response(response) {
    if (response.status == 200) {
      return response.json().then(this.fetchAsyncGCGS_ResponseBody);
    } else {
      console.log("GCGS - Request error ", response);
      return Promise.reject(response);
    }
  }

  fetchAsyncGCGS_ResponseBody(blob) {
    //console.log("blob", blob);
    this.state.game = blob.currentGame;
    this.state.currentSongNumber = blob.currentSong;
    this.state.timeStamp = blob.timeStamp;
    //console.log("Response set to state:", this.state);

    return Promise.resolve(true);
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
    if (response.status == 403) {
      console.log("403 Request rejected: ", response);
      return Promise.reject(response);
    } else if (response.status == 200) {
      response.json().then(x => console.log("Post resp json:", x))
      //return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  }

  postArtistSolved(id, time) {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var body = new FormData();
    body.append("id", id);
    body.append("time", time);

    var myInit = {
      method: 'POST',
      headers: myHeaders,
      body: body
    };
    var myRequest = new Request(this.baseUrl + '/artistSolved', myInit);

    return fetch(myRequest).then(this.handlePostRequest).then(x => console.log(x));
  }

  postTitleSolved(id, time) {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var body = new FormData();
    body.append("id", id);
    body.append("time", time);

    var myInit = {
      method: 'POST',
      headers: myHeaders,
      body: body
    };
    var myRequest = new Request(this.baseUrl + '/titleSolved', myInit);

    return fetch(myRequest).then(this.handlePostRequest).then(x => console.log(x));
  }
}
