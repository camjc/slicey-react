import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import SliceyArc from './slicey-arc';

const Svg = styled.svg`
  vertical-align: top;
  margin: 30px;
`;

const Background = styled.circle`
  fill: #555;
`;

const Donut = styled.circle`
  fill: #fff;
`;

const QUARTER = Math.PI / 2;
const HALF = Math.PI;
const ROUND = Math.PI * 2;
const RADIUS = 0.5;

const getPointX = (angle: number) => RADIUS * Math.cos(angle);

const getPointY = (angle: number) => RADIUS * Math.sin(angle);

type Dataset = {
  value: number;
  status: string;
}[];

const getArcs = (dataset: Dataset) => {
  const total = dataset.reduce(
    (accumulator, { value }) => accumulator + value,
    0
  );

  const arcs = new Array(dataset.length);
  let endAngle = -QUARTER;
  let startAngle = 0;

  dataset.forEach(({ value, status }, index) => {
    const angle = (ROUND * value) / total;
    startAngle = endAngle;
    endAngle += angle;
    arcs[index] = {
      status,
      key: index,
      largeArcFlag: angle > HALF ? 1 : 0,
      x1: getPointX(startAngle),
      x2: getPointX(endAngle),
      y1: getPointY(startAngle),
      y2: getPointY(endAngle),
    };
  });

  return arcs;
};

const Slicey = ({
  dataset,
  hasDonut,
  diameter,
}: {
  dataset: Dataset;
  hasDonut: boolean;
  diameter: number;
}) =>
  dataset && (
    <Svg height={diameter} width={diameter} viewBox="-0.5 -0.5 1 1">
      <Background r=".49" cx="0" cy="0" />
      {getArcs(dataset).map(arc => (
        <SliceyArc {...arc} />
      ))}
      {hasDonut && <Donut r=".25" cx="0" cy="0" />}
    </Svg>
  );

Slicey.propTypes = {
  dataset: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  hasDonut: PropTypes.bool,
  diameter: PropTypes.number,
};

Slicey.defaultProps = {
  dataset: null,
  diameter: 100,
  hasDonut: false,
};

export default Slicey;
