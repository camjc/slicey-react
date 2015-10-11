'use strict';

let React = require('react/addons');
let ReactTransitionGroup = React.addons.TransitionGroup;
let Slicey = require('./Slicey');

// CSS
require('normalize.css');
require('../styles/main.css');

let statuses = ['warning', 'positive', 'negative', 'info'];

let getTestData = function() {
  return statuses.map(function(status) {
    return {
      status: status,
      value: Math.random(),
    };
  });
};

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(/* function FrameRequestCallback */ callback) {
            window.setTimeout(callback, 1000 / 60);
          };
})();

let SparkyApp = React.createClass({
  getInitialState: function() {
    return {testData: getTestData()};
  },

  componentDidMount: function() {
    let _this = this;
    let animRenderer = function() {
      (function looper() {
        _this.bar();
        window.requestAnimFrame(looper);
      })();
    };

    window.addEventListener('click', animRenderer);
  },

  componentWillUnMount: function() {
    window.removeEventListener('click', this.bar);
  },

  bar: function() {
    this.setState({testData: getTestData()});
  },

  render: function() {
    return (
      <div className='main'>
        <ReactTransitionGroup transitionName='fade'>
          <Slicey dataset={this.state.testData} donut={true} diameter={100}/>
        </ReactTransitionGroup>
      </div>
    );
  },
});
React.render(<SparkyApp />, document.getElementById('content')); // jshint ignore:line

module.exports = SparkyApp;
