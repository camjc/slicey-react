/* eslint-disable import/no-extraneous-dependencies */
import { render } from 'react-dom';
import Slicey from './components/Slicey';

const root = document.getElementById('root');
const statuses = ['warning', 'positive', 'negative', 'info'];

const dataset = statuses.map(status => ({
  status,
  value: Math.random(),
}));

render(<Slicey dataset={dataset} />, root);
