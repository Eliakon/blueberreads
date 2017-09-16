import React, { PropTypes } from 'react';

import Goodreads from './Goodreads';
import Mail from './Mail';
import Twitter from './Twitter';

import './Icon.css';

export const tagMap = {
  Goodreads,
  Mail,
  Twitter,
};

const Icon = ({ type, color, size }) => {
  const Tag = tagMap[type];
  const PictoClasses = `icon icon--${type}`.toLowerCase();

  return (
    <svg
      className={PictoClasses}
      viewBox={'0 0 100 100'}
      width={size}
      height={size}
      aria-labelledby="title desc"
      tabIndex="0"
      role="img"
    >
      <title id="title">{type}</title>
      <desc id="desc">{type} picto</desc>
      <g fill={color} strokeWidth="0">
        {Tag && <Tag /> || null}
      </g>
    </svg>
  );
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
};

export default Icon;
