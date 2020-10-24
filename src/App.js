import './App.css';
import { Clock } from './Clock';


function App() {
  return (
    <div className="App">
      <Clock scale={["C4", "D4", "G4", "F4"]}/>
      <Clock scale={["C5", "D5", "G5", "Bb4"]}/>
      <Clock scale={["C5", "D5", "C5", "Bb4"]}/>

      </div>
  );
}

export default App;
