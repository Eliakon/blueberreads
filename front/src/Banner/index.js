import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom'

import './Banner.css'

const Banner = ({ size }) => (
  <header className={`banner ${size ? `banner-${size}`: ''}`}>
    <Link to="/">
      <img src="/images/logo-large.png" alt="Blueberreads" />
    </Link>
  </header>
);

Banner.propTypes = {
  size: PropTypes.string,
};

export default Banner;
