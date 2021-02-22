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
          gridsize={9}
          scale={["D2", "G2", "C3", "E3", "A3", "F4", "A4", "C5", "D5"]}
        />
      </div >
    )
  }
}

export default connect(mapStateToProps)(App);
