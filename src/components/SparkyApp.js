'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Slicey = require('./Slicey');

// CSS
require('normalize.css');
require('../styles/main.css');

var statuses = ['warning', 'positive', 'negative', 'info'];

var getTestData = function() {
  return statuses.map(function(status) {
    return {
      status: status,
      value: Math.random()
    };
  });
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var SparkyApp = React.createClass({
  getInitialState: function() {
    return {testData: getTestData()};
  },
  componentDidMount: function() {
    var _this = this;
    var animRenderer = function() {
      (function looper(){
        _this.bar();
        window.requestAnimFrame(looper);
      })();
    };
    window.addEventListener('click', animRenderer);
  },
  componentWillUnMount: function() {
    window.removeEventListener('click', this.bar);
  },
  bar: function(event) {
    this.setState({testData: getTestData()});
  },
  render: function() {
    return (
      <div className='main'>
        <ReactTransitionGroup transitionName="fade">
          <Slicey dataset={this.state.testData} donut={true} diameter={100}/>
        </ReactTransitionGroup>
      </div>
    );
  }
});
React.render(<SparkyApp />, document.getElementById('content')); // jshint ignore:line

module.exports = SparkyApp;
