import React from 'react';
import ReactDOM from 'react-dom';

export default class ServerConnection extends React.Component {
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
        },
        songStart: 0
      },
      dummy: {
        url: "http://listen.vo.llnwd.net/g1/8/5/8/8/2/246028858.mp3",
        artist: "Drake",
        title: "Fireworks featuring Alicia Keys (Album Version (Edited))",
        record: {
          username: "MaxMustermann",
          time: "00.01",
          date: "32.02.2018"
        },
        songStart: 0
      }
    }

    this.pullSong = this.pullSong.bind(this);
  }

  componentDidMount() {}

  pullSong() {
    return this.state.dummy;
  }
}
