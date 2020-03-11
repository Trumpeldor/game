import React, { Component, createRef } from 'react'
import Cell from './Cell'

class Grid extends Component {
  cellData = []
  trs = []
  iteration = 0
  componentDidMount() {
    this.run();
  }
  createTrs() {
    const { size } = this.props;
    if (this.trs.length === size) {
      return this.trs;
    }
    this.cellData = [];
    this.trs = [];
    this.iteration = 0;
    for (let i = 0; i < size; i++) {
      const tds = [];
      for (let j = 0; j < size; j++) {
        const ref = createRef();
        this.cellData.push({ref, neighbors: []});
        tds.push(<td key={'' + i + j}>{<Cell x={i} y={j} ref={ref} />}</td>);
      }
      this.trs.push(<tr key={i}>{tds}</tr>);
    }
    setTimeout(() => {
      this.cellData.forEach(cellDatum => {
        const neighborsCoors =  cellDatum.ref.current.getNeighborsCoors().filter(neighborCoor => {
          return neighborCoor.x >= 0 && neighborCoor.y >= 0 && neighborCoor.x < size && neighborCoor.y < size;
        });
        neighborsCoors.forEach(neighborsCoor => {
          for (let { ref: { current } }  of this.cellData) {
            if (neighborsCoor.x === current.props.x && neighborsCoor.y === current.props.y) {
              cellDatum.neighbors.push(current);
              break;
            }
          }
        });
      });
    }, 1);
    return this.trs;
  }
  applyRules = (cellDatum) => {
    const { ref: { current }, neighbors } = cellDatum;
    let livingNeighbors = 0;
    neighbors.forEach(neighbor => {
      if (neighbor.isAlive()) {
        livingNeighbors++;
      }
    });
    return current.isAlive() ? livingNeighbors < 2 || livingNeighbors > 3 : livingNeighbors === 3;
  }
  run() {
    const { running, speed } = this.props;
    setTimeout(() => {
      let gameOver = false;
      if (running) {
        this.iteration++;
        const cellsToRedraw = [];
        this.cellData.forEach(cellDatum => {
          if (this.applyRules(cellDatum)) {
            cellsToRedraw.push(cellDatum.ref.current);
          }
        });
        if (cellsToRedraw.length > 0) {
          cellsToRedraw.forEach(cellToRedraw => {
            cellToRedraw.redraw();
          });
        } else {
          gameOver = true;
        }
        const { countIterations } = this.props;
        countIterations(this.iteration, gameOver);
      }
      if (!gameOver)
        this.run();
    }, speed);
  };
  render () {
    return (
      <table align="center"><tbody>{this.createTrs()}</tbody></table>
    );
  }
}

export default Grid;