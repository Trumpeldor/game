import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Cell extends Component {
  state = {
    color: 'White'
  }
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }
  componentDidMount() {
    if (Math.round(Math.random()) === 0) {
      this.live();
    }
  }
  redraw() {
    this.isAlive() ? this.die() : this.live();
  }
  isAlive() {
    const { color } = this.state;
    return color === 'Black';
  }
  die() {
    this.setState({ color: 'White' });
  }
  live() {
    this.setState({ color: 'Black' });
  }
  getNeighborsCoors() {
    const { x, y } = this.props;
    const ret = [];
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (i !== 0 || j !== 0) {
          ret.push({
            x: x + i,
            y: y + j
          });
        }
      }
    }
    return ret;
  }
  render() {
    const { color } = this.state;
    return (
      <div className={'Cell ' + color}></div>
    );
  }
}

export default Cell;
