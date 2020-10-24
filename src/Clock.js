import React from 'react';
import * as Tone from 'tone';
import { Cell } from './Cell';
import { Ticker } from './Ticker';
export class Clock extends Ticker {
  constructor(props) {
    super(props);
    this.state = { loc: -1 };
    this.grid = [...Array(this.props.scale.length).keys()];
    this.synth = new Tone.Synth().toDestination();
    this.play = v => this.synth.triggerAttackRelease(v, "8n");
  }

  tick() {
    var newLoc = (this.state.loc + 1) % this.grid.length;
    this.setState({ ...this.state, loc: newLoc });
    this.play(this.props.scale[newLoc]);
  }

  subrender() {
    return (
      <span>
        {
          this.grid.map(num => {
            return <Cell key={num} val={this.state.loc === num ? "+" : "_"} />
          })
        }
      </span>
    );
  }
}
