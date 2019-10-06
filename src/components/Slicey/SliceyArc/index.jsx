/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles.module.css';

const SliceyArc = ({
  color, x1, y1, largeArcFlag, x2, y2,
}) => (
  <path
    className={styles[color]}
    d={`M0,0 L${x1},${y1} A0.5,0.5 0 ${largeArcFlag},1 ${x2},${y2} z`}
  />
);

SliceyArc.propTypes = {
  color: PropTypes.string.isRequired,
  largeArcFlag: PropTypes.number.isRequired,
  x1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
};

export default SliceyArc;
