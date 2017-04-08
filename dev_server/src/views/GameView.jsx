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
  render () {
    return (
      <Grid>
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
