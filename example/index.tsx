import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Slicey from '../.';

const statuses = ['warning', 'positive', 'negative', 'info'];

const dataset = statuses.map(status => ({
  status,
  value: Math.random(),
}));

const App = () => (
  <div>
    <Slicey dataset={dataset} hasDonut diameter={500} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
