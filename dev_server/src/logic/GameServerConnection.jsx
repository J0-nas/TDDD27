import ServerConnection from './ServerConnection.jsx'

export default class GameServerConnection extends ServerConnection {
  constructor() {
    super();
    this.state = {
      game: [],
      nextGame: [],
      dummy: {
        record: {
          userName: "userName",
          time: "0.0.0.1",
          date: "32.3.2031"
        }
      }
    }
    this.pullSong = this.pullSong.bind(this);
    this.asyncGetCurrentGameState = this.asyncGetCurrentGameState.bind(this);
    this.fetch_Response_Body_CurrentGame = this.fetch_Response_Body_CurrentGame.bind(this);
    this.handle_Response_CurrentGame = this.handle_Response_CurrentGame.bind(this);

    this.asyncGetNextGameState = this.asyncGetNextGameState.bind(this);
    this.fetch_Response_Body_NextGame = this.fetch_Response_Body_NextGame.bind(this);
    this.handle_Response_NextGame = this.handle_Response_NextGame.bind(this);

    this.prepareNextGame = this.prepareNextGame.bind(this);
  }

  pullSong() {
    var gs = this.state.game[this.state.currentSongNumber-1];
    const round = this.state.currentSongNumber;

    console.log("Pull state: ", gs, " ", this.state.currentSongNumber, ". round");
    this.state.currentSongNumber += 1;
    if (this.state.currentSongNumber == 11) {
      this.prepareNextGame();
    }
    return {url: gs.songUrl, artist: gs.artist, title: gs.title, record: this.state.dummy.record, round: round}
  }

  prepareNextGame() {
    this.state.game = this.state.nextGame;
    this.state.currentSongNumber = 1;
    setTimeout(10000, this.asyncGetNextGameState);
  }

  getTimeStamp() {
    return this.state.timeStamp;
  }

  handle_Response_CurrentGame(response) {
    if (response.status == 200) {
      return response.json().then(this.fetch_Response_Body_CurrentGame);
    } else {
      console.log("GCGS - Request error ", response);
      return Promise.reject(response);
    }
  }

  fetch_Response_Body_CurrentGame(blob) {
    this.state.game = blob.currentGame;
    console.log(this.state.game);
    this.state.currentSongNumber = blob.currentSong + 1;

    this.state.timeStamp = blob.timeStamp;
    return Promise.resolve(true);
  }

  asyncGetCurrentGameState() {
    console.log("Requested new game songs...");

    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");
    var myInit = {
      method: 'GET',
      headers: myHeaders
    };

    var myRequest = new Request(this.baseUrl + '/currentGame', myInit);
    return fetch(myRequest).then(this.handle_Response_CurrentGame, x => console.log("Error:", x));
  }

  fetch_Response_Body_NextGame(blob) {
    this.state.nextGame = blob.nextGame;
    console.log("next state: ", this.state.nextGame);
    return Promise.resolve(true);
  }

  handle_Response_NextGame(response) {
    if (response.status == 200) {
      return response.json().then(this.fetch_Response_Body_NextGame, x => Promise.reject("JSON could not be parsed"));
    } else {
      console.log("GCGS - Request error ", response);
      return Promise.reject(response);
    }
  }

  asyncGetNextGameState() {
    console.log("Requested next game songs...");

    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");
    var myInit = {
      method: 'GET',
      headers: myHeaders
    };

    var myRequest = new Request(this.baseUrl + '/nextGame', myInit);
    return fetch(myRequest).then(this.handle_Response_NextGame, x => console.log("Error:", x));
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
    body.append("username", id);
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
    body.append("username", id);
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
