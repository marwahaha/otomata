import './App.css';
import { Clock } from './Clock';
import { Grid } from './Grid';
import { connect } from 'react-redux';
import { updatePosAction } from './actions/updatePosAction';
import { updateDirAction } from './actions/updateDirAction';
import { Component } from 'react';

const mapStateToProps = state => ({
  ...state
})
const mapDispatchToProps = dispatch => ({
  updatePosAction: (idx, pos) => dispatch(updatePosAction(idx, pos)),
  updateDirAction: (idx, dir) => dispatch(updateDirAction(idx, dir))
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
          widgetsDir={this.props.widgetDirectionReducer}
          gridsize={6}
          scale={["C4", "C#4", "E4", "F#4", "G#4", "A#4", "B4", "D5"]}
          updatePosAction={this.props.updatePosAction}
          updateDirAction={this.props.updateDirAction}
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

// TODO may not need redux if use refs on state
export default connect(mapStateToProps, mapDispatchToProps)(App);
