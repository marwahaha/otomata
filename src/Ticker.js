import React from 'react';
export class Ticker extends React.Component {
    static ALL_SCALES = [
        {name: "Otomata", scale: ["E3","B3","C4","D4","E4","F#4","G4","B4","D5"]},
        {name: "Aeolian", scale: ["E3","A3","B3","C4","D4","E4","F4","G4","A4"]},
        {name: "Ake Bono", scale: ["E3","A3","B3","C4","E4","F4","A4","B4","C5"]},
        {name: "Yue-Diao", scale: ["E3","B3","D4","E4","G4","A4","B4","D5","E5"]},
        {name: "Bayati", scale: ["E3","A3","B3","C4","D4","E4","F4","G4","A4"]},
        {name: "Dorian", scale: ["E3","A3","B3","C4","D4","E4","F#4","G4","A4"]},
        {name: "Harmonic minor", scale: ["E3","A3","B3","C4","D4","E4","F4","G#4","A4"]},
        {name: "Hijaz", scale: ["E3","A3","A#3","C#4","D4","E4","F4","G4","A4"]},
        {name: "Hijaz kar", scale: ["E3","A3","A#3","C#4","D4","E4","F4","G#4","A4"]},
        {name: "Huzam", scale: ["E3","A3","C4","C#4","D4","E4","F#4","G#4","A4"]},
        {name: "Ionian", scale: ["E3","A3","B3","C#4","D4","E4","F#4","G#4","A4"]},
        {name: "Kokin-Choshi", scale: ["E3","A3","A#3","D4","E4","G4","A4","A#4","D5"]},
        {name: "Kourd-Atar", scale: ["E3","A3","A#3","C4","D#4","E4","F4","G#4","A4"]},
        {name: "Lydian", scale: ["E3","A3","B3","C#4","D#4","E4","F#4","G#4","A4"]},
        {name: "Yu-Diao", scale: ["E3","A3","C4","D4","E4","G4","A4","C5","D5"]},
        {name: "Neveseri", scale: ["E3","A3","A#3","C4","C#4","E4","F4","G4","G#4"]},
        {name: "Niavent", scale: ["E3","A3","B3","C4","D#4","E4","F4","G#4","A4"]},
        {name: "Nirz Rast", scale: ["E3","A3","B3","C#4","D4","E4","F#4","G4","A4"]},
        {name: "Gong-Diao", scale: ["E3","A3","B3","C#4","E4","F#4","A4","B4","C#5"]},
        {name: "Zhi-Diao", scale: ["E3","B3","D4","E4","F#4","G#4","B4","C#5","E5"]},
        {name: "Purvi", scale: ["E3","A3","A#3","C#4","D#4","E4","F4","G#4","A4"]},
        {name: "Pygmy", scale: ["E3","A3","B3","C4","E4","G4","A4","B4","C5"]},
        {name: "Rast", scale: ["E3","A3","B3","C#4","D4","E4","F#4","G#4","A4"]},
        {name: "Rumanikos", scale: ["E3","A3","B3","C4","D#4","E4","F#4","G4","A4"]},
        {name: "Sabah", scale: ["E3","A3","B3","C4","C#4","E4","F4","G4","G#4"]},
        {name: "Segiah", scale: ["E3","A3","C4","C#4","D4","E4","F4","G#4","A4"]},
        {name: "Sho", scale: ["E3","A3","B3","C4","D4","E4","F#4","A4","B4"]},
        {name: "Blues", scale: ["E3","A3","C4","D4","D#4","E4","G4","A4","C5"]},
        {name: "Goonkali", scale: ["E3","A3","A#3","D4","E4","F#4","A4","A#4","D5"]},
        {name: "Iwato", scale: ["E3","B3","C4","E4","F4","A4","B4","C5","E5"]},
        {name: "Kumoi", scale: ["E3","A3","B3","C4","E4","F#4","A4","B4","C5"]},
        {name: "Locrian", scale: ["E3","B3","C4","D4","E4","F4","G4","A4","B4"]},
        {name: "Magen Abot", scale: ["E3","G#3","A3","B3","C4","D4","E4","G4","G#4"]},
        {name: "Melog", scale: ["E3","G#3","A3","B3","D#4","E4","G#4","A4","B4"]},
        {name: "Mixolydian", scale: ["E3","A3","B3","C#4","D4","E4","F#4","G4","A4"]},
        {name: "Noh", scale: ["E3","A3","B3","D4","E4","F4","F#4","G#4","A4"]},
        {name: "Phrygian", scale: ["E3","A3","A#3","C4","D4","E4","F4","G4","A4"]},
        {name: "Pyeong Jo", scale: ["E3","B3","C#4","E4","G#4","A4","B4","C#5","E5"]},
        {name: "Shang-Diao", scale: ["E3","A3","B3","D4","E4","G4","A4","B4","D5"]},
        {name: "Zokuso", scale: ["E3","B3","C4","E4","F4","G4","B4","C5","E5"]},
    ];

    notImplemented = (name) => () => {
        throw new Error(name + " not implemented");
    }

    tick = this.notImplemented("tick");
    load = this.notImplemented("load");
    getURL = this.notImplemented("getURL");
    clear = this.notImplemented("clear");
    subrender = this.notImplemented("subrender");

    changeScale = (e) => {
        this.setState((state, _) => ({...state, scaleId: parseInt(e.target.value, 10)}))
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
                    <input placeholder="earslap URL" onChange={this.changeLoadInput} value={this.state.loadInput} className="loadurl"></input>&nbsp;<button onClick={this.load}>Load</button>
                    <span className="spacer"/>
                    <button onClick={this.getURL}>Get URL</button>
                </div>
                <div className="scalecontrols">
                    Scale:&nbsp;
                    <select name="scale" value={this.state.scaleId.toString()} className="scale" onChange={this.changeScale}>
                        {Ticker.ALL_SCALES.map((s, idx) => <option key={idx} value={idx}>{s.name}</option>)}
                    </select>
                </div>
                </div>
            </div >
        );
    }
}
