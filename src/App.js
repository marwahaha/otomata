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
        />
      </div >
    )
  }
}

export default connect(mapStateToProps)(App);
