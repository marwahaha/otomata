import React from 'react';
import { Cell } from './Cell';
export class Row extends React.Component {
  constructor(props) {
    super(props);
    this.grid = [...Array(this.props.len).keys()];
  }

  render() {
    return (
      <tr>
        {
          this.grid.map(num => {
            let key = this.props.offset * this.props.len + num;
            return <Cell handleClick={e => this.props.handleCellClick(e, num, this.props.offset)} key={key} val={this.props.vals[num]} />

          })
        }
      </tr>
    );
  }
}
