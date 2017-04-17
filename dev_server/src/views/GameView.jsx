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
	  <TextBox/>
	  <SolveInput/>
	  <PreviouslyPlayed/>
	</Grid>
	);
    }
}
