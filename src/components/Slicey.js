/* @flow */
'use strict';

let React = require('react/addons');

require('styles/Slicey.scss');

type ArcDatum = {
  color: string;
  id: number;
  largeArcFlag: number;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

type ArcData = Array<ArcDatum>

let SliceyArc = React.createClass({
  propTypes: {
    key: React.PropTypes.number,
    data: React.PropTypes.shape({
      color: React.PropTypes.string.isRequired,
      id: React.PropTypes.number.isRequired,
      largeArcFlag: React.PropTypes.number.isRequired,
      x1: React.PropTypes.number.isRequired,
      x2: React.PropTypes.number.isRequired,
      y1: React.PropTypes.number.isRequired,
      y2: React.PropTypes.number.isRequired,
    }),
  },
  render: function() {
    if (!this.props || !this.props.data) {return;}

    let data: ArcDatum = this.props.data;
    let d: string = `M0,0 L${data.x1},${data.y1} A0.5,0.5 0 ${data.largeArcFlag},1 ${data.x2},${data.y2} z`;
    return (
        <path className={data.color} d={d}></path>
      );
  },
});

const QUARTER: number = Math.PI / 2;
const HALF: number = Math.PI;
const ROUND: number = Math.PI * 2;
const RADIUS: number = 0.5;

type Dataset = [
  {
    status: string;
    value: number;
  }
]

let Slicey = React.createClass({
  propTypes: {
    dataset: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        status: React.PropTypes.string.isRequired,
        value: React.PropTypes.number.isRequired,
      })),
    donut: React.PropTypes.bool.isRequired,
    diameter: React.PropTypes.number,
  },
  getPointX: function(angle: number): number {
    return RADIUS * Math.cos(angle);
  },

  getPointY: function(angle: number): number {
    return RADIUS * Math.sin(angle);
  },

  getArcs: function(dataset: Dataset): ArcData {

    let datum;
    let i;
    let len;
    let total = 0;
    for (i = 0, len = dataset.length; i < len; i++) {
      datum = dataset[i];
      total += datum.value;
    }

    let arcs = new Array(dataset.length);
    let endAngle = -QUARTER;
    let index;
    let j;
    let len1;
    let startAngle = 0;
    for (index = j = 0, len1 = dataset.length; j < len1; index = ++j) {
      datum = dataset[index];
      let angle = ROUND * datum.value / total;
      startAngle = endAngle;
      endAngle += angle;
      arcs[index] = {
        color: datum.status,
        id: index,
        largeArcFlag: angle > HALF ? 1 : 0,
        x1: this.getPointX(startAngle),
        x2: this.getPointX(endAngle),
        y1: this.getPointY(startAngle),
        y2: this.getPointY(endAngle),
      };
    }

    return arcs;
  },

  render: function() {
    if (!this.props || !this.props.dataset) {return;}

    let donut;
    if (this.props.donut) {
      donut = <circle className='donut' r='.25' cx='0' cy='0'></circle>;
    }

    let diameter: number = this.props.diameter || 100;
    let arcData: ArcData = this.getArcs(this.props.dataset);
    return (
        <svg className='Slicey' height={diameter} width={diameter} viewBox='-0.5 -0.5 1 1'>
          <circle className='background' r='.49' cx='0' cy='0'></circle>
          {arcData.map(function(arc: ArcDatum) {
            return <SliceyArc key={arc.id} data={arc}/>;
          })}
          {donut}
        </svg>
      );
  },
});

module.exports = Slicey;
