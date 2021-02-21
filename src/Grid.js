import React from 'react';
import { Row } from './Row';
import { Widget } from './Widget';
import { Ticker } from './Ticker';
import * as Tone from 'tone';

export class Grid extends Ticker {
  constructor(props) {
    super(props);
    this.grid = [...Array(this.props.gridsize).keys()];
    this.widgets = {};
    this.synths = [];
    this.state = {
      widgets: this.widgets,
      synths: this.synths,
      vals: this.initVals(),
    }
    this.ctr = 0;

    this.addWidget = (pos0 = 0, pos1 = 0) => {
      this.widgets[this.ctr] = ({ idx: this.ctr, pos: [pos0, pos1], dir: 0 });
      this.synths.push(new Tone.Synth().toDestination());
      this.setState({ ...this.state, synths: this.synths, widgets: this.widgets });
      this.updateVals();
      this.ctr += 1;
    }

    this.handleCellClick.bind(this);

  }

  handleCellClick = (e, pos0, pos1) => {
    let clickedWidgets = Object.values(this.state.widgets).filter(w => w.pos[0] === pos0 && w.pos[1] === pos1).flat();
    if (clickedWidgets.length === 0) {
      // Put widget there
      this.addWidget(pos0, pos1);

    } else if (clickedWidgets.length === 1) {
      let idx = clickedWidgets[0].idx;
      let dir = this.widgets[idx].dir;
      if (dir < 3) {
        // rotate widget
        this.widgets[idx].dir = (dir + 1) % 4;
      } else {
        // delete widget
        delete this.widgets[idx];
      }
      this.setState({ ...this.state, widgets: this.widgets });
      this.updateVals();
    }
  };

  initVals() {
    return new Array(this.props.gridsize).fill('_')
      .map(x => new Array(this.props.gridsize).fill(''));
  }

  getArrow(pos) {
    if (pos === 0) {
      return '🡻';
    } else if (pos === 1) {
      return '🡺';
    } else if (pos === 2) {
      return '🡹';
    } else {
      return '🡸';
    }
  }

  updateVals() {
    let vals = this.initVals();
    Object.values(this.widgets).forEach(w => vals[w.pos[1]][w.pos[0]] += this.getArrow(w.dir));
    this.setState({ ...this.state, vals });
  }

  tick() {
    this.widgets = this.state.widgets;
    Object.keys(this.widgets).forEach(idx => this.updateWidget(idx));
    this.setState({ ...this.state, widgets: this.widgets });
    this.handleCollisions();
    this.updateVals();
  }

  didHitWall(pos, dir) {
    const last = this.props.gridsize - 1;
    return (dir === 0 && pos[1] === last)
      || (dir === 1 && pos[0] === last)
      || (dir === 2 && pos[1] === 0)
      || (dir === 3 && pos[0] === 0);
  }

  makeSound(pos, dir, synth) {
    let val = 0;
    const last = this.props.gridsize - 1;
    // TODO demystify this code
    if ((dir % 2 === 1) && (pos[0] === 0 || pos[0] === last)) {
      val = pos[1];
    } else {
      val = pos[0];
    }
    synth.triggerAttackRelease(this.props.scale[val], "8n");
  }


  updateWidget(idx) {
    let widget = this.widgets[idx];
    let synth = this.synths[idx];

    // if this will hit the wall, reverse and sound and finish
    if (this.didHitWall(widget.pos, widget.dir)) {
      let newDir = (widget.dir + 2) % 4;
      this.widgets[idx].dir = newDir;
      this.makeSound(widget.pos, widget.dir, synth);
      return;
    }

    let pos = widget.pos;
    if (widget.dir === 0) {
      pos = [widget.pos[0], (widget.pos[1] + 1 + this.props.gridsize) % this.props.gridsize]
    } else if (widget.dir === 2) {
      pos = [widget.pos[0], (widget.pos[1] - 1 + this.props.gridsize) % this.props.gridsize]
    } else if (widget.dir === 1) {
      pos = [(widget.pos[0] + 1 + this.props.gridsize) % this.props.gridsize, widget.pos[1]];
    } else {
      pos = [(widget.pos[0] - 1 + this.props.gridsize) % this.props.gridsize, widget.pos[1]];
    }
    this.widgets[idx].pos = pos;

    // bounce off wall and make sound if hit a wall
    if (this.didHitWall(pos, widget.dir)) {
      let newDir = (widget.dir + 2) % 4;
      this.widgets[idx].dir = newDir;
      this.makeSound(widget.pos, widget.dir, synth);
    }
  }

  handleCollisions() {
    var data = {};
    Object.values(this.widgets).forEach(w => {
      var val = w.pos + "|" + w.dir;
      data[val] = w.idx;
    });

    // Only collide if opposing direction
    Object.keys(data).forEach(d => {
      var rev = d.split("|")[0] + "|" + ((parseInt(d.split("|")[1], 10) + 2) % 4);
      if (data[rev] !== undefined) {
        // change direction
        let newDir = (this.widgets[data[rev]].dir + 1) % 4;
        this.widgets[data[rev]].dir = newDir;
      }
    })
    this.setState({ ...this.state, widgets: this.widgets });
  }

  groupBy(xs, key, access) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x[access]);
      return rv;
    }, {});
  };


  subrender() {
    return (
      <div>
        <table>
          <tbody>
            {
              this.grid.map(num => {
                return <Row handleCellClick={this.handleCellClick}
                  offset={num} key={num} vals={this.state.vals[num]} len={this.props.gridsize} />
              })
            }
          </tbody>
        </table>
        <br />
        {
          Object.values(this.state.widgets).map(w => {
            return <Widget
              idx={w.idx}
              key={w.idx}
              dir={w.dir}
              pos={w.pos}
            />
          })
        }

      </div>

    );
  }
}
