import React from 'react';
import ReactDOM from 'react-dom';

import ProgressBar from './ProgressBar.jsx';
import ProgressCounter from './ProgressCounter.jsx';
import AudioPlayer from './AudioPlayer.jsx';
import TextBox from './TextBox.jsx';
import SolveInput from './SolveInput.jsx';
import PreviouslyPlayed from './PreviouslyPlayed.jsx';

import {Grid} from 'react-bootstrap';

export default class GameView extends React.Component {
  constructor() {
    super();

    this.state = {
      currentSong: {
        active: true,
        started: true,
        startDate: 0,
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

      textBox: {
        artist: "***",
        title: "*****"
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
    };

    this.inputSubmitCallback = this.inputSubmitCallback.bind(this);
    this.processInput = this.processInput.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.levenshteinDistance = this.levenshteinDistance.bind(this);
    this.startSong = this.startSong.bind(this);
    this.getSynnonyms = this.getSynnonyms.bind(this);
  }

  componentDidMount() {
    this.startSong();
  }

  /*
      Starts a new Song. Expects current the server side information in this.state.artist/url/title/record
      */
  startSong() {
    if (this.state.currentSong.started) {
      console.log("song had already started")
    }
    var aArray = this.state.currentSong.artist.split(/[ ,]+/g).map(this.toTAElement);
    var tArray = this.state.currentSong.title.split(/[ ,]+/g).map(this.toTAElement);

    var oldCSState = this.state.currentSong;
    oldCSState.artistElementArray = aArray;
    oldCSState.titleElementArray = tArray;
    this.setState({currentSong: oldCSState});

    var newArtistLabel = this.buildLabelString(this.state.currentSong.artistElementArray);
    var newTitleLabel = this.buildLabelString(this.state.currentSong.titleElementArray);

    var oldTextBoxState = this.state.textBox;
    oldTextBoxState.artist = newArtistLabel;
    oldTextBoxState.title = newTitleLabel;
    this.setState({textBox: oldTextBoxState});

    var oldCSState = this.state.currentSong;
    oldCSState.startDate = Date.now();
    this.setState({currentSong: oldCSState});

    //TODO
    var song = new Audio(this.state.currentSong.url);
    song.src = "http://listen.vo.llnwd.net/g3/5/4/8/1/7/1302071845.mp3";
    song.currentTime = this.state.currentSong.songStart;
    song.volume = 0.3;
    song.play();
  }

  getSynnonyms(s) {
    return [];
  }

  toTAElement(s) {
    //TODO function that determines if a word has to be solved
    var mbs = true;
    //var synn = this.getSynnonyms(s)
    return {
      word: s, synnonyms: [], //synn,
      length: s.length,
      mustBeSolved: mbs,
      hasBeenSolved: !mbs
    };
  }

  processInput(input) {
    if (!this.state.currentSong.active) {
      return;
    }
    console.log("process input")
    var didTAChange = this.checkInput(input);
    var a_s = this.checkIfSolved(this.state.currentSong.artistElementArray);
    var t_s = this.checkIfSolved(this.state.currentSong.titleElementArray);
    if (a_s && t_s) {
      const time = Date.now() - this.state.currentSong.startDate;
      console.log("Song was solved in: " + time + " send time to server")
    }
    if (a_s) {}
    if (t_s) {}
    if (didTAChange) {
      var newArtistLabel = this.buildLabelString(this.state.currentSong.artistElementArray);
      var newTitleLabel = this.buildLabelString(this.state.currentSong.titleElementArray);

      var oldState = this.state.textBox
      oldState.artist = newArtistLabel;
      oldState.title = newTitleLabel;

      this.setState({textBox: oldState});
    }
  }

  checkInput(input) {
    console.log("GV processing input")
    if (!this.state.currentSong.active) {
      return;
    }

    const inputWords = input.split(" ");
    var d = 0;
    var allowedTypos = 0;
    //copy of state => single refresh of the state at the end instead of
    //multiple changes during loop
    var aArray = this.state.currentSong.artistElementArray;
    var tArray = this.state.currentSong.titleElementArray;
    //flags to recognize if state has to be updated
    var a_s = false;
    var t_s = false;

    for (var i in inputWords) {
      for (var a_i in aArray) {
        var a = aArray[a_i];
        if (a.mustBeSolved && !a.hasBeenSolved) {
          if (a.length > 3) {
            allowedTypos = Math.floor((a.length - 1) / 3);
          } else {
            allowedTypos = 0;
          }

          d = this.levenshteinDistance(inputWords[i], a.word);
          if (d - allowedTypos <= 0) {
            //Success changes
            console.log("solved ", a.word, "with ", inputWords[i], " d", d, " at", allowedTypos);
            a.hasBeenSolved = true;
            a_s = true;
            continue;
          }
          for (var s_i in a.synnonyms) {
            var s = a.synnonyms[s_i];
            if (a.length > 3) {
              allowedTypos = Math.floor((a.length - 1) / 3);
            } else {
              allowedTypos = 0;
            }

            d = this.levenshteinDistance(inputWords[i], s);
            if (d - allowedTypos <= 0) {
              //Success changes
              a.hasBeenSolved = true;
              a_s = true;
              break;
            }
          }
        }
      }
      for (var t_i in tArray) {
        var t = tArray[t_i];
        if (t.mustBeSolved && !t.hasBeenSolved) {
          if (t.length > 3) {
            allowedTypos = Math.floor((t.length - 1) / 3);
          } else {
            allowedTypos = 0;
          }

          d = this.levenshteinDistance(inputWords[i], t.word);
          if (d - allowedTypos <= 0) {
            //Success changes
            t.hasBeenSolved = true;
            t_s = true;
            break;
          }
          for (var s_i in t.synnonyms) {
            var s = t.synnonyms[s_i];
            if (a.length > 3) {
              allowedTypos = Math.floor((a.length - 1) / 3);
            } else {
              allowedTypos = 0;
            }

            d = this.levenshteinDistance(inputWords[i], s);
            if (d - allowedTypos <= 0) {
              //Success changes
              t.hasBeenSolved = true;
              t_s = true;
              break;
            }
          }
        }
      }
    }
    if (a_s) {
      var cs = this.state.currentSong;
      cs.artistElementArray = aArray;
      console.log(aArray);
      this.setState({currentSong: cs});
    }
    if (t_s) {
      var cs = this.state.currentSong;
      cs.titleElementArray = tArray;
      this.setState({currentSong: cs});
    }
    return (a_s || t_s);
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

  checkIfSolved(taArray) {
    return taArray.filter(function(ta) {
      return ta.mustBeSolved
    }).reduce(function(acc, ta) {
      return acc && ta.hasBeenSolved;
    }, true);
  }

  levenshteinDistance(a, b) {
    if (a.length === 0)
      return b.length
    if (b.length === 0)
      return a.length
    let tmp,
      i,
      j,
      prev,
      val
    // swap to save some memory O(min(a,b)) instead of O(a)
    if (a.length > b.length) {
      tmp = a
      a = b
      b = tmp
    }

    var row = Array(a.length + 1)
    // init the row
    for (i = 0; i <= a.length; i++) {
      row[i] = i
    }

    // fill in the rest
    for (i = 1; i <= b.length; i++) {
      prev = i
      for (j = 1; j <= a.length; j++) {
        if (b[i - 1] === a[j - 1]) {
          val = row[j - 1] // match
        } else {
          val = Math.min(row[j - 1] + 1, // substitution
              Math.min(prev + 1, // insertion
              row[j] + 1)) // deletion
        }
        row[j - 1] = prev
        prev = val
      }
      row[a.length] = prev
    }
    return row[a.length]
  }

  inputSubmitCallback(input) {
    console.log("GV recieved: ", input);
    this.processInput(input);
  }

  render() {
    var s = {
      backgroundColor: "rgba(100,100,100,0.5)",
      marginRight: "0px",
      width: "100%"
    }

    return (
      <Grid style={s}>
        <ProgressBar/>
        <ProgressCounter/>
        <AudioPlayer/>

        <TextBox artist={this.state.textBox.artist} title={this.state.textBox.title}/>
        <SolveInput gvCB={this.inputSubmitCallback}/>
        <PreviouslyPlayed artist={this.state.previouslyPlayed.artist} title={this.state.previouslyPlayed.title} rUser={this.state.previouslyPlayed.record.userName} rTime={this.state.previouslyPlayed.record.time} rDate={this.state.previouslyPlayed.record.date}/>
      </Grid>
    );
  }
}
