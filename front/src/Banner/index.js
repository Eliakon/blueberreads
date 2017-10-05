import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom'

import './Banner.css'

const Banner = () => (
  <header className="banner">
    <Link to="/">
      <img src="/static/images/logo-large.png" alt="Blueberreads" />
    </Link>
  </header>
);

Banner.propTypes = {
  size: PropTypes.string,
};

export default Banner;
