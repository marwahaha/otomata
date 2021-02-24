import './App.css';
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
        <Grid
          interval={200}
          gridsize={9}
          scale={["E3", "B3", "C4", "D4", "E4", "F#4", "G4", "B4", "D5"]}
        />
      </div >
    )
  }
}

export default connect(mapStateToProps)(App);
