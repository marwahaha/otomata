import React from 'react';
import { Cell } from './Cell';
export class Row extends React.Component {
  constructor(props) {
    super(props);
    this.grid = [...Array(this.props.len).keys()];
  }

  render() {
    return (
      <div>
        {
          this.grid.map(num => {
            return <Cell key={this.props.offset * this.props.len + num} val={this.props.offset * this.props.len + num} />

          })
        }
      </div>
    );
  }
}
