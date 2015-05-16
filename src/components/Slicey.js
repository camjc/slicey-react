'use strict';

var React = require('react/addons');


require('styles/Slicey.scss');

var SliceyArc = React.createClass({
  propTypes: {
    key: React.PropTypes.number,
    data: React.PropTypes.shape({
      color: React.PropTypes.string.isRequired,
      x1: React.PropTypes.number.isRequired,
      y1: React.PropTypes.number.isRequired,
      x2: React.PropTypes.number.isRequired,
      y2: React.PropTypes.number.isRequired,
      largeArcFlag: React.PropTypes.number.isRequired
    }),
  },
  render: function () {
    var data = this.props.data;
    var d = 'M0,0 L' + data.x1 + ',' + data.y1 + ' A0.5,0.5 0 ' + data.largeArcFlag + ',1 ' + data.x2 + ',' + data.y2 + ' z';
    return (
        <path className={data.color} d={d}></path>
      );
  }
});

const QUARTER = Math.PI / 2;
const HALF = Math.PI;
const ROUND = Math.PI * 2;
const RADIUS = 0.5;

var Slicey = React.createClass({
  propTypes: {
    dataset: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        status: React.PropTypes.string.isRequired,
        value: React.PropTypes.number.isRequired
      })),
    donut: React.PropTypes.bool.isRequired,
    diameter: React.PropTypes.number,
  },
  getPointX: function(angle) {
    return RADIUS * Math.cos(angle);
  },
  getPointY: function(angle) {
    return RADIUS * Math.sin(angle);
  },
  getArcs: function(dataset) {
    var angle, arcs, datum, endAngle, i, index, j, len, len1, startAngle, total;
    total = 0;
    for (i = 0, len = dataset.length; i < len; i++) {
      datum = dataset[i];
      total += datum.value;
    }
    arcs = new Array(dataset.length);
    startAngle = 0;
    endAngle = -QUARTER;
    for (index = j = 0, len1 = dataset.length; j < len1; index = ++j) {
      datum = dataset[index];
      angle = ROUND * datum.value / total;
      startAngle = endAngle;
      endAngle += angle;
      arcs[index] = {
        id: index,
        x1: this.getPointX(startAngle),
        y1: this.getPointY(startAngle),
        x2: this.getPointX(endAngle),
        y2: this.getPointY(endAngle),
        largeArcFlag: angle > HALF ? 1 : 0,
        color: datum.status
      };
    }
    return arcs;
  },
  render: function () {
    var donut;
    if (this.props.donut) {
      donut = <circle className='donut' r='.25' cx='0' cy='0'></circle>;
    }
    var diameter = this.props.diameter || 100;
    var arcData = this.getArcs(this.props.dataset);
    return (
        <svg className='Slicey' height={diameter} width={diameter} viewBox='-0.5 -0.5 1 1'>
          <circle className='background' r='.49' cx='0' cy='0'></circle>
          {arcData.map(function(arc) {
            return <SliceyArc key={arc.id} data={arc}/>;
          })}
          {donut}
        </svg>
      );
  }
});


module.exports = Slicey;
