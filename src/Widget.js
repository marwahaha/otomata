import React from 'react';
export class Widget extends React.Component {
    constructor(props) {
        super(props);
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
    }

    render() {
        return (
            <div>
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
