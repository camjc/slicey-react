import React from 'react';
import renderer from 'react-test-renderer';

import Slicey from '../src';

it('renders null without a dataset', () => {
  const tree = renderer.create(<Slicey />).toJSON();
  expect(tree).toMatchSnapshot();
});

const dataset = [
  { status: 'warning', value: 50 },
  { status: 'error', value: 20 },
];

it('renders svg with a dataset', () => {
  const tree = renderer.create(<Slicey dataset={dataset} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a donut', () => {
  const tree = renderer.create(<Slicey dataset={dataset} hasDonut/>).toJSON();
  expect(tree).toMatchSnapshot();
});
