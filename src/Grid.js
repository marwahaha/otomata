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
      vals: this.initVals(),
    }
    // so far: just support adding, not deleting...
    // TODO - I wish this didn't initialize on the top left, but actually where I clicked.
    // Could have callback function to Cell, but then need a way to initialize Widget at location
    // does this need to put pos and dir in props?
    this.addWidget = () => {
      this.widgetIdxs.push(this.widgetIdxs.length);
      this.setState({ ...this.state, widgetIdxs: this.widgetIdxs });
    }
  }

  initVals() {
    return new Array(this.props.gridsize).fill('_')
      .map(x => new Array(this.props.gridsize).fill('_'));
  }

  getArrow(pos) {
    if (pos === 0) {
      return 'v';
    } else if (pos === 1) {
      return '>';
    } else if (pos === 2) {
      return '^';
    } else {
      return '<';
    }
  }

  updateVals() {
    let vals = this.initVals();

    (Object.values(this.refs) || []).forEach(w => {
      var pos = w.state.pos;
      vals[pos[1]][pos[0]] += this.getArrow(w.state.dir);
    })
    this.setState({ ...this.state, vals });
  }

  tick() {
    (Object.values(this.refs) || []).forEach(r => r.move());
    this.handleCollisions();
  }

  handleCollisions() {
    var r = this.refs;

    var data = {};
    Object.keys(r).forEach(idx => {
      var state = r[idx].state;
      var val = state.pos + "|" + state.dir;
      data[val] = idx;
    });
    console.log(data)

    // Only collide if opposing direction
    Object.keys(data).forEach(d => {
      var rev = d.split("|")[0] + "|" + ((parseInt(d.split("|")[1], 10) + 2) % 4);
      // console.log(d, rev);
      if (data[rev] !== undefined) {
        this.refs[data[rev]].changeDir();
      }
    })
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
    // TODO check object equality
    if (prevProps.widgetsPos !== this.props.widgetsPos) {
      this.updateVals();
    }
    if (prevProps.widgetsDir !== this.props.widgetsDir) {
      this.updateVals();
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
        {/* TODO set widget position */}
        <button onClick={this.addWidget}>Add widget</button>
        <br />
        {
          this.state.widgetIdxs.map(idx => {
            return <Widget
              ref={idx}
              idx={idx}
              key={idx}
              updatePosAction={this.props.updatePosAction}
              updateDirAction={this.props.updateDirAction}
              gridsize={this.props.gridsize}
              scale={this.props.scale}
            />
          })
        }

      </div>

    );
  }
}
