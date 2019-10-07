import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Path = styled.path`
  fill: ${({ status }: { status: string }) => {
    switch (status) {
      case 'positive':
        return '#95ac7c';
      case 'negative':
        return '#bc601d';
      case 'info':
        return '#bea552';
      default:
        return '#efe6c0';
    }
  }};
`;
const SliceyArc = ({
  status,
  x1,
  y1,
  largeArcFlag,
  x2,
  y2,
}: {
  status: string;
  x1: number;
  y1: number;
  largeArcFlag: boolean;
  x2: number;
  y2: number;
}) => (
  <Path
    d={`M0,0 L${x1},${y1} A0.5,0.5 0 ${largeArcFlag},1 ${x2},${y2} z`}
    status={status}
  />
);

SliceyArc.propTypes = {
  status: PropTypes.string.isRequired,
  largeArcFlag: PropTypes.number.isRequired,
  x1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
};

export default SliceyArc;
