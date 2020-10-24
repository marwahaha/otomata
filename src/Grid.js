import React from 'react';
import { Row } from './Row';
import { Widget } from './Widget';
import { Ticker } from './Ticker';

export class Grid extends Ticker {
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
    let vals = new Array(this.props.gridsize).fill(0)
      .map(x => new Array(this.props.gridsize).fill(0));

    (Object.values(this.props.widgetsPos) || []).forEach(pos => {
      vals[pos[1]][pos[0]] += 1;
    })
    this.setState({ ...this.state, vals });
  }

  tick() {
    (Object.values(this.refs) || []).forEach(r => r.move());
    this.handleCollisions();
  }

  handleCollisions() {
    const keysAndVals = Object.entries(this.props.widgetsPos)
      .map(x => [x[0], x[1].join(',')]);

    const collidingWidgetIds = Object.values(this.groupBy(keysAndVals, 1, 0))
      .filter(x => x.length > 1)
      .flat();

    collidingWidgetIds.forEach(id => this.refs[id].changeDir());
    // TODO this won't prevent if they have the same dir.. but they shouldn't!

    // TODO will this have the new state positions in time?
    // could put in  updateVals but I only want to trigger it once
    // Object.values(this.refs) || []).forEach()
  }

  groupBy(xs, key, access) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x[access]);
      return rv;
    }, {});
  };

  componentDidUpdate(prevProps) {
    if (prevProps.widgetsPos !== this.props.widgetsPos) {
      this.updateVals();
      // TODO check object equality
    }
  }

  subrender() {
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
