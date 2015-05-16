'use strict';

describe('Slicey', function () {
  var React = require('react/addons');
  var Slicey, component;

  beforeEach(function () {
    Slicey = require('components/Slicey.js');
    component = React.createElement(Slicey);
  });

  it('should create a new instance of Slicey', function () {
    expect(component).toBeDefined();
  });
});
