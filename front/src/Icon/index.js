import PropTypes from 'prop-types';
import React from 'react';

import Discussion from './Discussion';
import Goodreads from './Goodreads';
import Link from './Link';
import Mail from './Mail';
import StarFilled from './StarFilled';
import StarUnfilled from './StarUnfilled';
import Twitter from './Twitter';

import './Icon.css';

export const tagMap = {
  Discussion,
  Goodreads,
  Link,
  Mail,
  StarFilled,
  StarUnfilled,
  Twitter,
};

const Icon = ({ type, color, size }) => {
  const Tag = tagMap[type];
  const PictoClasses = `icon icon--${type}`.toLowerCase();

  if (Tag) {
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
          <Tag />
        </g>
      </svg>
    );
  }
  console.log('icon type unknown:', type);
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
};

export default Icon;
