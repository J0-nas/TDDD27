import React from 'react';
import ReactDOM from 'react-dom';

import ProgressBar from './ProgressBar.jsx';
import ProgressCounter from './ProgressCounter.jsx';
import VolumeView from './VolumeView.jsx';
import TextBox from './TextBox.jsx';
import SolveInput from './SolveInput.jsx';
import PreviouslyPlayed from './PreviouslyPlayed.jsx';
import GameLogic from './../logic/GameLogic.jsx';

import {Grid} from 'react-bootstrap';

export default class GameView extends React.Component {
    constructor() {
        super();

        this.state = {
            textBox: {
                artist: "***",
                title: "*****"
            }
        };

        this.inputSubmitCallback = this.inputSubmitCallback.bind(this);
        this.updateATLabels = this.updateATLabels.bind(this);
        this.songBreak = this.songBreak.bind(this);
    }

    componentDidMount() {
        this.props.initHande({updateATLabels: this.updateATLabels, songBreak: this.songBreak})
    }

    songBreak(duration, type) {
        console.log("break of type ", type, " for ", duration);
    }

    inputSubmitCallback(input) {
        console.log("GV recieved: ", input);
        this.props.processInputHandle(input);
    }

    updateATLabels(newArtistLabel, newTitleLabel) {
        var labelState = this.state.textBox;
        labelState.artist = newArtistLabel;
        labelState.title = newTitleLabel;
        this.setState({textBox: labelState});
    }

    render() {
        return (
            <Grid className="glass" id="GameView">
                <VolumeView
                    callback={this.props.volumeCallback}/>
                <div id="GameMechanic">
                    <ProgressCounter
                        onAnimationCounterHandle={this.props.AnimationCounterHandle}
                        setStartAtHandle={this.props.addStartHandle}
                    />
                    <div id="subpart">
                        <TextBox
                            artist={this.state.textBox.artist}
                            title={this.state.textBox.title}
                        />
                        <SolveInput
                            onAnimationInputHandle={this.props.AnimationInputHandle}
                            gvCB={this.inputSubmitCallback}
                        />
                        <ProgressBar
                            onAnimationBarHandle={this.props.AnimationBarHandle}
                            setStartAtHandle={this.props.addStartHandle}
                        />
                    </div>
                </div>
                <PreviouslyPlayed
                    artist={this.props.previouslyPlayed.artist}
                    title={this.props.previouslyPlayed.title}
                    rUser={this.props.previouslyPlayed.record.userName}
                    rTime={this.props.previouslyPlayed.record.time}
                    rDate={this.props.previouslyPlayed.record.date}/>
            </Grid>
        );
    }
}
