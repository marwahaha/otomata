import React from 'react';
import * as Tone from 'tone';

export class Widget extends React.Component {
    constructor(props) {
        super(props);

        this.pos = [0, 0];
        this.state = { dir: 0, pos: this.pos };
        this.props.updatePosAction(this.props.idx, this.pos);
        this.synth = new Tone.Synth().toDestination();
        this.play = v => this.synth.triggerAttackRelease(v, "8n");

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

            // if this will hit the wall, reverse and sound and finish
            if (this.didHitWall()) {
                this.setState({ ...this.state, dir: (this.state.dir + 2) % 4 });
                this.makeSound();
                return;
            }

            if (this.state.dir === 0) {
                this.up();
            } else if (this.state.dir === 1) {
                this.right();
            } else if (this.state.dir === 2) {
                this.down();
            } else {
                this.left();
            }

            // update redux store
            this.props.updatePosAction(this.props.idx, this.pos);

            // change dir and make sound if hit a wall
            this.props.updatePosAction(this.props.idx, this.state.pos);
            if (this.didHitWall()) {
                this.setState({ ...this.state, dir: (this.state.dir + 2) % 4 });
                this.makeSound();
            }
        }

        this.changeDir = () => {
            this.setState({ ...this.state, dir: (this.state.dir + 1) % 4 });
        }
    }

    didHitWall(dir = this.state.dir) {
        const pos = this.state.pos;
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
        // TODO demystify this code
        if ((this.state.dir % 2 === 1) && (pos[0] === 0 || pos[0] === last)) {
            val = pos[1];
        } else {
            val = pos[0];
        }
        this.play(this.props.scale[val]);
    }

    render() {
        return (
            <div>
                idx: {this.props.idx}
                pos: {this.state.pos.toString()}
                dir: {this.state.dir.toString()}
                <button onClick={this.move}>
                    Move
                </button>
                <button onClick={this.changeDir}>
                    Change Dir
                </button>
            </div>
        );
    }
}
