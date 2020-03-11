import React, { Component } from 'react';
import Grid from './components/Grid'
import './App.css';

class App extends Component {
  state = {
    gameOver: false,
    iterations: 0,
    running: false,
    size: 50,
    speed: 400
  }
  sizeOptions = [ 5, 10, 15, 20, 25, 30, 35, 40, 45, 50 ]
  changeSize = (e) => {
    this.setState({ iterations: 0, size: parseInt(e.target.value) });
  }
  changeSpeed = (e) => {
    this.setState({ speed: parseInt(e.target.value) });
  }
  countIterations = (iterations, gameOver) => {
    this.setState({ iterations, gameOver });
  }
  toggleRunning = () => {
    const { running } = this.state;
    this.setState({ running: !running });
  }
  render() {
    const { gameOver, iterations, running, size, speed } = this.state;
    return (
      <div className="App">
        {!gameOver &&
        <div>
          <div>
            <label>Choose size:</label>
            <select value={size} disabled={running} onChange={this.changeSize}>
              {this.sizeOptions.map((sizeOption, key) => {
                return <option key={key} value={sizeOption}>{sizeOption}</option>;
              })}
            </select>
            <label>Run speed (ms): {speed}</label>
            <input type="range" min="10" max="400" value={speed} onChange={this.changeSpeed} step="10" />
            <button onClick={this.toggleRunning}>
              {running && <div>Pause</div>}
              {!running && <div>Play</div>}
            </button>
          </div>
          <div>
            {iterations > 0 && <label>Iterations: {iterations}</label>}
          </div>
        </div>
        }
        {gameOver &&
        <div>
          <label>Game is over after {iterations} iterations</label>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
        }
        <Grid countIterations={this.countIterations} running={running} size={size} speed={speed} />
      </div>
    );
  }
}

export default App;
