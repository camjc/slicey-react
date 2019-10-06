import React from 'react';
import { shallow, mount } from 'enzyme';

import Slicey from '../../../src/components/Slicey';

it('renders null without a dataset', () => {
  const wrapper = shallow(<Slicey />);
  expect(wrapper.equals(null)).toBe(true);
});

const dataset = [{ status: 'warning', value: 50 }, { status: 'error', value: 20 }];

it('renders svg with a dataset', () => {
  const wrapper = shallow(<Slicey dataset={dataset} />);
  expect(wrapper).toMatchSnapshot();
});

it('renders svg with a dataset (mounted)', () => {
  const wrapper = mount(<Slicey dataset={dataset} />);
  expect(wrapper).toMatchSnapshot();
});

it('renders a donut', () => {
  const wrapper = shallow(<Slicey dataset={dataset} hasDonut />);
  expect(wrapper.find('circle')).toHaveLength(2);
});
