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
          scale={["E2", "B2", "C3", "D3", "E3", "F#3", "G3", "B3", "D4"]}
        />
      </div >
    )
  }
}

export default connect(mapStateToProps)(App);
