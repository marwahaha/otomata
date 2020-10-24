import React from 'react';
import { Row } from './Row';
export class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.grid = [...Array(this.props.gridsize).keys()];
    this.state = {
      vals: new Array(this.props.gridsize).fill(0)
        .map(x => new Array(this.props.gridsize).fill(0))
    }
  }


  updateVals() {
    let vals = new Array(this.props.gridsize).fill(0)
      .map(x => new Array(this.props.gridsize).fill(0));

    (Object.values(this.props.widgetsPos) || []).forEach(pos => {
      vals[pos[0]][pos[1]] += 1;
    })
    this.setState({ vals });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.widgetsPos !== this.props.widgetsPos) {
      this.updateVals();
      // TODO check object equality
    }
  }

  render() {
    return (
      <div>
        {
          this.grid.map(num => {
            return <Row offset={num} key={num} vals={this.state.vals[num]} len={this.props.gridsize} />
          })
        }
      </div>
    );
  }
}
