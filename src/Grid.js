import React from 'react';
import { Row } from './Row';
import { Widget } from './Widget';
import { Ticker } from './Ticker';
import * as Tone from 'tone';

export class Grid extends Ticker {
  constructor(props) {
    super(props);

    this.grid = [...Array(this.props.gridsize).keys()];
    this.reverb = new Tone.Reverb(0.3).toDestination();
    this.feedback = new Tone.FeedbackDelay(0.3, 0.2).toDestination();

    this.state = {
      widgets: {},
      synths: [],
      vals: this.initVals(),
      interval: 200,
      ctr: 0,
    }

    // TODO this causes tick() to run all the time
    // document.addEventListener('keydown', event => {
    //   if (event.code === 'Space') {
    //     this.toggleTimer();
    //   }
    // })
  }

  _addWidgetInternal = (state, pos0, pos1) => {
    let newWidgets = JSON.parse(JSON.stringify(state.widgets));
    newWidgets[state.ctr] = {idx: state.ctr, pos: [pos0, pos1], dir: 0};

    let newSynths = state.synths.slice();
    newSynths.push(new Tone.Synth().connect(this.reverb).connect(this.feedback).toDestination());
    return { ...state, synths: newSynths, widgets: newWidgets, vals: this.updateVals(newWidgets), ctr: state.ctr + 1 };
  }

  clear = () => {
     this.setState((state, _) => ({...state, widgets: {}, vals: this.updateVals({})}));
  }

  handleCellClick = (e, pos0, pos1) => {
    this.setState((state, _) => {
      let clickedWidgets = Object.values(state.widgets).filter(w => w.pos[0] === pos0 && w.pos[1] === pos1).flat();
      if (clickedWidgets.length === 0) {
        // Put widget there
        return this._addWidgetInternal(state, pos0, pos1);

      } else if (clickedWidgets.length === 1) {
        let idx = clickedWidgets[0].idx;
        let newWidgets = JSON.parse(JSON.stringify(state.widgets));
        let dir = newWidgets[idx].dir;
        if (dir < 3) {
          // rotate widget
          newWidgets[idx].dir = (dir + 1) % 4;
          // TODO fix double rotation
        } else {
          // delete widget
          delete newWidgets[idx];
        }
        return { ...state, widgets: newWidgets, vals: this.updateVals(newWidgets) };
      }
    });
  }

  initVals() {
    return new Array(this.props.gridsize).fill('')
      .map(_ => new Array(this.props.gridsize).fill(''));
  }

  static getArrow(pos) {
    if (pos === 0) {
      return '↑';
    } else if (pos === 1) {
      return '→';
    } else if (pos === 2) {
      return '↓';
    } else {
      return '←';
    }
  }

  updateVals(widgets) {
    let vals = this.initVals();
    Object.values(widgets).forEach(w => vals[w.pos[1]][w.pos[0]] += Grid.getArrow(w.dir));
    return vals;
  }

  tick() {
    this.setState((state, _) => {
      let newWidgets = {};
      Object.keys(state.widgets).forEach(idx => {
        newWidgets[idx] = this.updateWidget(state.widgets[idx]);
      });
      newWidgets = this.handleCollisions(newWidgets);
      return { ...state, widgets: newWidgets, vals: this.updateVals(newWidgets)};
    });
    let sounded = this.playSounds();
    this.highlightCells(sounded);
  }

  playSounds() {
    let sounded = {'cols': [], 'rows': []};
    Object.keys(this.state.widgets).forEach(idx => {
      // if hit the wall, sound
      let widget = this.state.widgets[idx];
      let synth = this.state.synths[idx];
      if (this.didHitWall(widget.pos, widget.dir)) {
        this.makeSound(widget.pos, widget.dir, synth);

        if (widget.dir % 2) {
          sounded['rows'].push(widget.pos[1]);
        } else {
          sounded['cols'].push(widget.pos[0]);
        }
      }
    });
    return sounded;
  }

  highlightCells(sounded) {
    let cellsToFlash = [];
    for (let i = 0; i < this.props.gridsize; i++) {
      for (let j=0; j < this.props.gridsize; j++) {
        if (sounded['rows'].indexOf(i) !== -1  || sounded['cols'].indexOf(j) !== -1) {
          cellsToFlash.push(i*this.props.gridsize + j);
        }
      }
    }
    let cells = document.getElementsByClassName("cell");
    cellsToFlash.forEach(id => {if (!cells[id].innerText) {cells[id].className = 'cell flashing'}});
    setTimeout(() => cellsToFlash.forEach(id => {if (!cells[id].innerText) {cells[id].className = 'cell'}}), 75);
  }

  didHitWall(pos, dir) {
    const last = this.props.gridsize - 1;
    return (dir === 0 && pos[1] === 0)
      || (dir === 1 && pos[0] === last)
      || (dir === 2 && pos[1] === last)
      || (dir === 3 && pos[0] === 0);
  }

  makeSound(pos, dir, synth) {
    let val = 0;
    const last = this.props.gridsize - 1;
    // TODO demystify this code
    if ((dir % 2 === 1) && (pos[0] === 0 || pos[0] === last)) {
      val = last - pos[1];
    } else {
      val = pos[0];
    }
    synth.triggerAttackRelease(this.props.scale[val % this.props.scale.length], "8n", Tone.now(), 0.3);
  }

  updateWidget(oldWidget) {
    let widget = JSON.parse(JSON.stringify(oldWidget));
    // if this will hit the wall, reverse
    if (this.didHitWall(widget.pos, widget.dir)) {
      widget.dir = (widget.dir + 2) % 4;
    }

    if (widget.dir === 2) {
      widget.pos = [widget.pos[0], (widget.pos[1] + 1 + this.props.gridsize) % this.props.gridsize]
    } else if (widget.dir === 0) {
      widget.pos = [widget.pos[0], (widget.pos[1] - 1 + this.props.gridsize) % this.props.gridsize]
    } else if (widget.dir === 1) {
      widget.pos = [(widget.pos[0] + 1 + this.props.gridsize) % this.props.gridsize, widget.pos[1]];
    } else {
      widget.pos = [(widget.pos[0] - 1 + this.props.gridsize) % this.props.gridsize, widget.pos[1]];
    }

    return widget;
  }

  handleCollisions(widgets) {
    const keysAndVals = Object.values(widgets)
      .map(w => [w.idx, w.pos.join(',')]);

    const groupedWidgetIds = Object.values(this.groupBy(keysAndVals, 1, 0));
    groupedWidgetIds.filter(x => x.length > 2).flat().forEach(id => {
      // 3 or more, just reverse direction
      widgets[id].dir = (widgets[id].dir + 2) % 4;
    });
    groupedWidgetIds.filter(x => x.length === 2).flat().forEach(id => {
      // 2, rotate
      widgets[id].dir = (widgets[id].dir + 1) % 4;
    });
    return widgets;
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
