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
            this.props.interval
        );
        this.setState({ ...this.state, timerSet: true });
    }

    unsetTimer = () => {
        clearInterval(this.timerID);
        this.setState({ ...this.state, timerSet: false });
    }

    toggleTimer = () => {
        this.state.timerSet ? this.unsetTimer() : this.setTimer();
    }

    componentWillUnmount() {
        this.unsetTimer();
    }

    render() {
        return (
            <div>
                {this.subrender()}
                <button onClick={this.toggleTimer}>
                    {this.state.timerSet ? "Pause" : "Play"}
                </button>
            </div >
        );
    }
}
