/* @flow */
'use strict';

var SparkyApp = require('./SparkyApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={SparkyApp}>
    <Route name='/' handler={SparkyApp}/>
  </Route>
);

Router.run(Routes, function(Handler) {
  React.render(<Handler/>, content);
});
