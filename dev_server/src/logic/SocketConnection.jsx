import ServerConnection from './ServerConnection.jsx';
import { Socket } from './../socket/phoenix.js';

export default class SocketConnection extends ServerConnection {
  constructor(f) {
    super();
    this.socket_url = this.baseUrl.replace(/(http|https)/, 'ws') + "/socket";
    this.socket_created = false;

    this.channel_dict = {};
    this.standingsCallback = f;

    this.connect = this.connect.bind(this);
    this.join_channel = this.join_channel.bind(this);
    this.send_msg = this.send_msg.bind(this);
    this.receive_standings_msg = this.receive_standings_msg.bind(this);
  }

  connect() {
    this.socket = new Socket(this.socket_url, {
      //logger: (kind, msg, data) => console.log(kind, msg, data)
    });
    this.socket.connect();
    this.socket_created = true;
  }

  join_channel(channel_name) {
    if (!(channel_name in this.channel_dict)) {
      var channel = this.socket.channel(channel_name, {});
      channel.on("new_msg", msg => { console.log("Got message from socket", msg); this.receive_standings_msg(msg) } );
      channel.join()
        .receive("ok", ({messages}) => {
          console.log("catching up", messages);
          this.channel_dict[channel_name] = channel;
        })
        .receive("error", ({reason}) => {
          console.log("failed join", reason);
          return;
        })
        .receive("timeout", () => {
          console.log("Networking issue. Still waiting...");
          return;
        });
    }
  }

  send_msg(channel_name, msg) {
    if (!this.socket_created) {
      this.connect();
    }
    if (!(channel_name in this.channel_dict)) {
      var channel = this.socket.channel(channel_name, {});
      channel.on("new_msg", msg => { console.log("Got message from socket", msg); this.receive_standings_msg(msg) } );
      channel.join()
        .receive("ok", ({messages}) => {
          console.log("catching up", messages);
          this.channel_dict[channel_name] = channel;
          this.channel_dict[channel_name].push("new_msg", {body: msg}, 10000)
            .receive("ok", (msg) => console.log("created message", msg) )
            .receive("error", (reasons) => console.log("create failed", reasons) )
            .receive("timeout", () => console.log("Networking issue...") );
        })
        .receive("error", ({reason}) => {
          console.log("failed join", reason);
          return;
        })
        .receive("timeout", () => {
          console.log("Networking issue. Still waiting...");
          return;
        });
    } else {
      this.channel_dict[channel_name].push("new_msg", {body: msg}, 10000)
        .receive("ok", (msg) => console.log("created message", msg) )
        .receive("error", (reasons) => console.log("create failed", reasons) )
        .receive("timeout", () => console.log("Networking issue...") );
    }
  }

  receive_standings_msg(msg) {
    const json = JSON.parse(msg.msg);
    this.standingsCallback(json);
  }
}
