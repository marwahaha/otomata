import './App.css';
import { Clock } from './Clock';
import { Grid } from './Grid';
import { connect } from 'react-redux';
import { Component } from 'react';

const mapStateToProps = state => ({
  ...state
})

class App extends Component {
  render() {
    return (
      <div className="App">

        Clocks
        <Clock scale={["C4", "D4", "G4", "F4"]} />
        <Clock scale={["C5", "D5", "G5", "Bb4"]} />
        <Clock scale={["C5", "D5"]} />
        <br />
Grid
        <Grid
          gridsize={6}
          scale={["C4", "C#4", "E4", "F#4", "G#4", "A#4", "B4", "D5"]}
        // todo validate scale size = gridsize
        />
      </div >
    )
  }
}

// loop in otomata
// move all widgets
// then make sounds if on edge
// then change directions if overlap

// TODO may not need redux if use refs on state
export default connect(mapStateToProps)(App);
