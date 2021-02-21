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
          scale={["E2", "A2", "D3", "G3", "A3", "C4", "F4", "C5", "D5"]}
        />
      </div >
    )
  }
}

export default connect(mapStateToProps)(App);
