import React from 'react';
export class Ticker extends React.Component {

    notImplemented = (name) => () => {
        throw new Error(name + " not implemented");
    }

    tick = this.notImplemented("tick");
    load = this.notImplemented("load");
    getURL = this.notImplemented("getURL");
    clear = this.notImplemented("clear");
    subrender = this.notImplemented("subrender");

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
        this.setState({interval:  Ticker.convertBpmInterval(bpm)})
    }

    static convertBpmInterval(a) {
        return 30000/a;
    }

    changeLoadInput = (e) => {
        this.setState({loadInput: e.target.value})
    }

    renderTempo = () => parseInt(Ticker.convertBpmInterval(this.state.interval), 10).toString();

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
                <input className="bpm" onChange={this.changeInterval} value={this.renderTempo()} disabled={this.state.timerSet} type="number" min="50" max="300" placeholder={this.renderTempo()}/>
                <div className="urlcontrols">
                    <input placeholder="earslap URL" onChange={this.changeLoadInput} className="loadurl"></input>&nbsp;<button onClick={this.load}>Load</button>
                    <span className="spacer"/>
                    <button onClick={this.getURL}>Get URL</button>
                </div>
                </div>
            </div >
        );
    }
}
