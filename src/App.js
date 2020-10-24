import './App.css';
import { Clock } from './Clock';
import { Grid } from './Grid';
import { Widget } from './Widget';

function App() {
  return (
    <div className="App">
      Clocks
      <Clock scale={["C4", "D4", "G4", "F4"]} />
      <Clock scale={["C5", "D5", "G5", "Bb4"]} />
      <Clock scale={["C5", "D5"]} />
      <br />
Grid
      <Grid gridsize={3} />
      <br />
      Widget
      <Widget gridsize={3} />
    </div>
  );
}

// loop in otomata
// move all widgets
// then make sounds if on edge
// then change directions if overlap

export default App;
