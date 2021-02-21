import React from 'react';
export class Ticker extends React.Component {
    tick() {
        throw new Error("tick not implemented");
    }

    subrender() {
        throw new Error("subrender not implemented");
    }

    setTimer = () => {
        this.timerID = setInterval(
            () => this.tick(),
            750
        );
        this.setState({ ...this.state, timerSet: true });
    }

    unsetTimer = () => {
        clearInterval(this.timerID);
        this.setState({ ...this.state, timerSet: false });
    }

    componentWillUnmount() {
        this.unsetTimer();
    }

    render() {
        return (
            <div>
                {this.subrender()}
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
