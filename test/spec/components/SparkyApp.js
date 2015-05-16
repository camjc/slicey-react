'use strict';

describe('SparkyApp', function () {
  var React = require('react/addons');
  var SparkyApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    SparkyApp = require('components/SparkyApp.js');
    component = React.createElement(SparkyApp);
  });

  it('should create a new instance of SparkyApp', function () {
    expect(component).toBeDefined();
  });
});
