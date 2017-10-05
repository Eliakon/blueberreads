import PropTypes from 'prop-types';
import React from 'react';

import Banner from '../Banner';

import './Spinner.css';

const Spinner = ({ show }) => (
  <div className={`spinner-wrapper ${!show ? 'hidden' : ''}`}>
    <Banner />
    <div className="spinner">
      <img src="/static/images/berry.png" alt="" />
      <img src="/static/images/berry.png" alt="" />
      <img src="/static/images/berry.png" alt="" />
      <img src="/static/images/berry.png" alt="" />
    </div>
  </div>
);

Spinner.propTypes = {
  show: PropTypes.bool,
};

Spinner.defaultProps = {
  show: false,
};

export default Spinner;
