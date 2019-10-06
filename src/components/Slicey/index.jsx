/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.css';
import SliceyArc from './SliceyArc';

const QUARTER = Math.PI / 2;
const HALF = Math.PI;
const ROUND = Math.PI * 2;
const RADIUS = 0.5;

const getPointX = angle => RADIUS * Math.cos(angle);

const getPointY = angle => RADIUS * Math.sin(angle);

const getArcs = (dataset) => {
  const total = dataset.reduce(
    (accumulator, { value }) => accumulator + value,
    0,
  );

  const arcs = new Array(dataset.length);
  let endAngle = -QUARTER;
  let startAngle = 0;

  dataset.forEach(({ value, status }, index) => {
    const angle = (ROUND * value) / total;
    startAngle = endAngle;
    endAngle += angle;
    arcs[index] = {
      color: status,
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

const Slicey = ({ dataset, hasDonut, diameter }) =>
  dataset && (
    <svg
      className={styles.slicey}
      height={diameter}
      width={diameter}
      viewBox="-0.5 -0.5 1 1"
    >
      <circle className={styles.background} r=".49" cx="0" cy="0" />
      {getArcs(dataset).map(arc => (
        <SliceyArc {...arc} />
      ))}
      {hasDonut && <circle className={styles.donut} r=".25" cx="0" cy="0" />}
    </svg>
  );

Slicey.propTypes = {
  dataset: PropTypes.arrayOf(PropTypes.shape({
    status: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })),
  hasDonut: PropTypes.bool,
  diameter: PropTypes.number,
};

Slicey.defaultProps = {
  dataset: null,
  diameter: 100,
  hasDonut: false,
};

export default Slicey;
