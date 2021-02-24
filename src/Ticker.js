import React from 'react';
export class Ticker extends React.Component {
    tick() {
        throw new Error("tick not implemented");
    }

    clear() {
        throw new Error("clear not implemented")
    }

    subrender() {
        throw new Error("subrender not implemented");
    }

    setTimer = () => {
        this.timerID = setInterval(
            () => this.tick(),
            this.state.interval
        );
        this.setState((state, _) =>  ({...state, timerSet: true}));
      }

    unsetTimer = () => {
        clearInterval(this.timerID);
        this.setState((state, _) =>  ({...state, timerSet: false}));
    }

    toggleTimer = () => {
        this.state.timerSet ? this.unsetTimer() : this.setTimer();
    }

    componentWillUnmount() {
        this.unsetTimer();
    }

    changeInterval = (e) => {
        let bpm = parseInt(e.target.value, 10);
        this.setState({interval:  30000/bpm})
        // TODO update running ticker...
    }

    render() {
        return (
            <div>
                {this.subrender()}
                <div className='controls'>
                <button onClick={this.toggleTimer}>
                    {this.state.timerSet ? "Pause" : "Play"}
                </button>
                <span className="spacer"/>
                <button onClick={this.clear}>Clear</button>
                <span className="spacer"/>
                Tempo:&nbsp;
                <input className="bpm" onChange={this.changeInterval} disabled={this.state.timerSet} type="number" min="50" max="300" placeholder={parseInt(30000/this.state.interval).toString()}/>
                </div>
            </div >
        );
    }
}
