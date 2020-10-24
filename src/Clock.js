import React from 'react';
import * as Tone from 'tone';
import {Cell} from './Cell';
export class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loc: -1, timerSet: false};
    this.grid = [...Array(this.props.scale.length).keys()];
    this.synth = new Tone.Synth().toDestination();
    this.play = v =>  this.synth.triggerAttackRelease(v, "8n");
  }
  
  setTimer = () => {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    this.setState({...this.state, timerSet: true});
  }

  unsetTimer = () => {
      clearInterval(this.timerID);
      this.setState({...this.state, timerSet: false});
    }

  componentWillUnmount() {
      this.unsetTimer();
  }

  tick() {    
    var newLoc = (this.state.loc +1) % this.grid.length;
      this.setState({...this.state, loc: newLoc }); 
      this.play(this.props.scale[newLoc]);
    }

  render() {
    return (
      <div>
        {
            this.grid.map(num => {
                 return <Cell key={num} val={this.state.loc === num ? "+" : "_"}/>
            })
        }
       <button disabled={this.state.timerSet} onClick={this.setTimer}>
            Play
        </button>
        <button disabled={!this.state.timerSet} onClick={this.unsetTimer}>
            Pause
        </button>
      </div>
    );
  }
}
