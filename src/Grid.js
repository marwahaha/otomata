import React from 'react';
import { Row } from './Row';
import { Widget } from './Widget';

export class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.grid = [...Array(this.props.gridsize).keys()];

    this.widgetIdxs = [];
    this.state = {
      widgetIdxs: this.widgetIdxs,
      vals: new Array(this.props.gridsize).fill(0)
        .map(x => new Array(this.props.gridsize).fill(0))
    }
    // so far: just support adding, not deleting...
    this.addWidget = () => {
      this.widgetIdxs.push(this.widgetIdxs.length);
      this.setState({ ...this.state, widgetIdxs: this.widgetIdxs });
    }
  }

  updateVals() {
    // todo: update refs as a ticker
    let vals = new Array(this.props.gridsize).fill(0)
      .map(x => new Array(this.props.gridsize).fill(0));

    (Object.values(this.props.widgetsPos) || []).forEach(pos => {
      vals[pos[0]][pos[1]] += 1;
    })
    this.setState({ ...this.state, vals });
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
        <button onClick={this.addWidget}>Add widget</button>
        <br />
        {
          this.state.widgetIdxs.map(idx => {
            return <Widget
              ref={idx}
              idx={idx}
              key={idx}
              updatePosAction={this.props.updatePosAction}
              gridsize={this.props.gridsize}
              scale={this.props.scale}
            />
          })
        }

      </div>

    );
  }
}
