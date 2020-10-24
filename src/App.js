import './App.css';
import { Clock } from './Clock';
import { Grid } from './Grid';
import { connect } from 'react-redux';
import { updatePosAction } from './actions/updatePosAction';
import { Component } from 'react';

const mapStateToProps = state => ({
  ...state
})
const mapDispatchToProps = dispatch => ({
  updatePosAction: (idx, pos) => dispatch(updatePosAction(idx, pos))
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
          widgetsPos={this.props.widgetPositionReducer}
          gridsize={4}
          scale={["C4", "D4", "E4", "F#4", "G#4", "A#4", "B4", "D5"]}
          updatePosAction={this.props.updatePosAction}
        // todo validate scale size = gridsize
        />
        <br />
        Redux Store
        <pre>
          {
            JSON.stringify(this.props)
          }
        </pre>
      </div >
    )
  }
}

// loop in otomata
// move all widgets
// then make sounds if on edge
// then change directions if overlap

export default connect(mapStateToProps, mapDispatchToProps)(App);
