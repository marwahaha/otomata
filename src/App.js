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
          gridsize={7}
          scale={["E3", "A3", "D4", "G4", "C5", "E5", "D6"]}
        // TODO -> assert grid size is not larger than scale size
        />
      </div >
    )
  }
}

export default connect(mapStateToProps)(App);
