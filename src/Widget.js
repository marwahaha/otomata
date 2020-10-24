import React from 'react';
import * as Tone from 'tone';

import { Ticker } from './Ticker';
export class Widget extends Ticker {
    constructor(props) {
        super(props);
        this.synth = new Tone.Synth().toDestination();
        this.play = v => this.synth.triggerAttackRelease(v, "8n");

        this.pos = [0, 0];
        this.state = { dir: 0, pos: this.pos };
        this.up = () => {
            this.pos[1] = (this.pos[1] + 1 + this.props.gridsize) % this.props.gridsize;
            this.setState({ ...this.state, pos: this.pos });
        }
        this.down = () => {
            this.pos[1] = (this.pos[1] - 1 + this.props.gridsize) % this.props.gridsize;
            this.setState({ ...this.state, pos: this.pos });
        }
        this.left = () => {
            this.pos[0] = (this.pos[0] - 1 + this.props.gridsize) % this.props.gridsize;
            this.setState({ ...this.state, pos: this.pos });
        }
        this.right = () => {
            this.pos[0] = (this.pos[0] + 1 + this.props.gridsize) % this.props.gridsize;
            this.setState({ ...this.state, pos: this.pos });
        }
        this.move = () => {
            if (this.state.dir === 0) {
                this.up();
            } else if (this.state.dir === 1) {
                this.right();
            } else if (this.state.dir === 2) {
                this.down();
            } else {
                this.left();
            }
        }
        this.changeDir = () => {
            this.setState({ ...this.state, dir: (this.state.dir + 1) % 4 })
        }
        this.props.updatePosAction(this.props.idx, this.pos);

    }

    tick() {
        // this is in case dir changes outside of this loop and it's next to a wall
        if (this.isNextToWall()) {
            this.setState({ ...this.state, dir: (this.state.dir + 2) % 4 });
        }
        // move one space
        this.move();
        // change dir and make sound if hit a wall
        this.props.updatePosAction(this.props.idx, this.state.pos);
        if (this.isNextToWall()) {
            this.setState({ ...this.state, dir: (this.state.dir + 2) % 4 });
            this.makeSound();
        }
    }

    isNextToWall() {
        const pos = this.state.pos;
        const dir = this.state.dir;
        const last = this.props.gridsize - 1;
        return (dir === 0 && pos[1] === last)
            || (dir === 1 && pos[0] === last)
            || (dir === 2 && pos[1] === 0)
            || (dir === 3 && pos[0] === 0);
    }


    makeSound() {
        const pos = this.state.pos;
        let val = 0;
        const last = this.props.gridsize - 1;
        if ((this.state.dir % 2 === 1) && (pos[0] === 0 || pos[0] === last)) {
            val = pos[1];
        } else {
            val = pos[0];
        }
        this.play(this.props.scale[val]);
    }

    checkIfHitWall() {
        if (this.state.dir === 0 || this.state.dir === 2) {
            if (this.state.pos[1] === 0) {
                // top wall
                return true;
            }
            if (this.state.pos[1] === (this.props.gridsize - 1)) {
                // bottom wall
                return true;
            }
        }
        if (this.state.dir === 1 || this.state.dir === 3) {
            if (this.state.pos[0] === 0) {
                // left wall
                return true;
            }
            if (this.state.pos[0] === (this.props.gridsize - 1)) {
                // right wall
                return true;
            }
        }
        return false;
    }

    subrender() {
        return (
            <span>
                pos: {this.state.pos.toString()}
                dir: {this.state.dir.toString()}
                <button onClick={this.move}>
                    Move
                </button>
                <button onClick={this.changeDir}>
                    Change Dir
                </button>
            </span>
        );
    }
}
