import React from 'react';
import ReactDOM from 'react-dom';

import ProgressBar from './ProgressBar.jsx';
import ProgressCounter from './ProgressCounter.jsx';
import AudioPlayer from './AudioPlayer.jsx';
import TextBox from './TextBox.jsx';
import SolveInput from './SolveInput.jsx';
import PreviouslyPlayed from './PreviouslyPlayed.jsx';

import { Grid } from 'react-bootstrap';


export default class GameView extends React.Component {
    constructor() {
	super();

	this.state = {
	    currentSong: {
		active: false,
		started: false,
		url: "none",
		artist: "defaultArtist",
		title: "defaultTitle",
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
    }

    /*
      Starts a new Song. Expects current the server side information in this.state.artist/url/title/record 
      */
    startSong() {
	if (this.state.currentSong.started) {
	    console.log("song had already started")
	}
	var aArray = this.state.currentSong.artist.split(/[ ,]+/g).map(toTAElement);
	var tArray = this.state.currentSong.title.split(/[ ,]+/g).map(toTAElement);

	var oldCSState = this.state.currentSong;
	oldCSState.artistElementArray = aArray;
	oldCSState.titleElementArray = tArray;
	this.setState(currentSong: oldCSState);

	var newArtistLabel = buildLabelString(this.state.currentSong.artistElementArray);
	var newTitleLabel = buildLabelString(this.state.currentSong.titleElementArray);

	var oldTextBoxState = this.state.textBox;
	oldTextBoxState.artist = newArtistLabel;
	oldTextBoxState.title = newTitleLabel;
	this.setState(textBox: oldTextBoxState);
    }
    
    getSynnonyms(s) {
	return [];
    }
    
    toTAElement(s) {
	//TODO function that determines if a word has to be solved
	mbs = true;
	return {
	    word: s,
	    synnonyms: getSynnonyms(s),
	    length: s.length,
	    mustBeSolved: mbs,
	    hasBeenSolved: !mbs
	};
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
	
	for (i in inputWords) {
	    for (a_i in aArray) {
		var a = aArray[a_i];
		if (a.mustBeSolved && !a.hasBeenSolved) {
		    if (a.length > 3) { allowedTypos = Math.floor((a.length-1)/3); }
		    else { allowedTypos = 0; }

		    d = levenshteinDistance(inputWords[i], a.word);
		    if (d-allowedTypos <= 0) {
			//Success changes
			a.hasBeenSolved = true;
			a_s = true;
			break;
		    }
		    for (s_i in a.synnonyms) {
			var s = a.synnonyms[s_i];
			if (a.length > 3) { allowedTypos = Math.floor((a.length-1)/3); }
			else { allowedTypos = 0; }

			d = levenshteinDistance(inputWords[i], s);
			if (d-allowedTypos <= 0) {
			    //Success changes
			    a.hasBeenSolved = true;
			    a_s = true;
			    break;
			}
		    }
		}
	    }
	    for (t_i in tArray) {
		var t = tArray[t_i];
		if (t.mustBeSolved && !t.hasBeenSolved) {
		    if (t.length > 3) { allowedTypos = Math.floor((t.length-1)/3); }
		    else { allowedTypos = 0; }

		    d = levenshteinDistance(inputWords[i], t.word);
		    if (d-allowedTypos <= 0) {
			//Success changes
			t.hasBeenSolved = true;
			t_s = true;
			break;
		    }
		    for (s_i in t.synnonyms) {
			var s = t.synnonyms[s_i];
			if (a.length > 3) { allowedTypos = Math.floor((a.length-1)/3); }
			else { allowedTypos = 0; }

			d = levenshteinDistance(inputWords[i], s);
			if (d-allowedTypos <= 0) {
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
	    this.setState({currentSong: cs});
	}
	if (t_s) {
	    var cs = this.state.currentSong;
	    cs.titleElementArray = tArray;
	    this.setState({currentSong: cs});
	}
    }

    buildLabelString(taArray) {
	var wordArray = taArray.map(
	    function(ta) {
		if (!ta.mustBeSolved || ta.hasBeenSolved) {
		    return ta.word;
		}
		return "*".repeat(ta.length);
	    }
	);
	return wordArray.join(" ");
    }

    checkIfSolved(taArray) {
	return taArray.filter(
	    function(ta) {
		return ta.mustBeSolved
	    }
	).reduce(
	    function(acc, ta) {
		return acc && ta.hasBeenSolved;
	    }, true
	);
    }

    levenshteinDistance(s, t) {
	var cost;
	if (s.length == 0) { return t.length; }
	if (t.length == 0) { return s.length; }

	if (s[s.length -1] == t[t.length -1]) { cost = 0; }
	else { cost = 0 }

	var new_s = s.slice(0, -1);
	var new_t = t.slice(0, -1);

	return Math.min( levenshteinDistance(new_s, t) + 1,
			 levenshteinDistance(s, new_t) + 1,
			 levenshteinDistance(new_s, new_t) + cost
		       );
    }
    
    
    inputSubmitCallback(input) {
	console.log("GV recieved: ", input);
	this.processInput(input);
    }    
    
    render () {
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

		<TextBox
	    artist= { this.state.textBox.artist }
	    title= { this.state.textBox.title }
		/>
		<SolveInput
	    gvCB= { this.inputSubmitCallback }
		/>
		<PreviouslyPlayed
	    artist= { this.state.previouslyPlayed.artist}
	    title= { this.state.previouslyPlayed.title }
	    rUser= { this.state.previouslyPlayed.record.userName }
	    rTime= { this.state.previouslyPlayed.record.time }
	    rDate= { this.state.previouslyPlayed.record.date }
		/>
	</Grid>
	);
    }
}
