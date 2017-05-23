import ServerConnection from './ServerConnection.jsx'

export default class UtilityServerConnection extends ServerConnection {
  constructor() {
    super();
  }


  loginRequest(username, passwd) {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var body = new FormData();
    body.append("username", username);
    body.append("password", passwd);

    var myInit = {
      method: 'POST',
      headers: myHeaders,
      body: body
    };
    var myRequest = new Request(this.baseUrl + '/login', myInit);

    return fetch(myRequest)
      .then(function(response) {
        if (response.status == 200) {
          return response.json();
        } else {
          return Promise.resolve({status: -1, value: "Server returned " + String(response.status)})
        }
      });
  }

  registerRequest(username, email, passwd) {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var body = new FormData();
    body.append("username", username);
    body.append("email", email);
    body.append("password", passwd);

    var myInit = {
      method: 'POST',
      headers: myHeaders,
      body: body
    };
    var myRequest = new Request(this.baseUrl + '/register', myInit);

    return fetch(myRequest)
      .then(function(response) {
        if (response.status == 200) {
          return response.json();
        } else {
          return Promise.reject({status: -1, value: "Server returned " + String(response.status)})
        }
      });
  }
}
