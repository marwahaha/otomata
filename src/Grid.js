import React from 'react';
import { Row } from './Row';
export class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.grid = [...Array(this.props.gridsize).keys()];
  }

  render() {
    return (
      <div>
        {
          this.grid.map(num => {
            return <Row offset={num} key={num} len={this.props.gridsize} />
          })
        }
      </div>
    );
  }
}
