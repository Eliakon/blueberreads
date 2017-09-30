import PropTypes from 'prop-types';
import React from 'react';

import PostSummary from './PostSummary';

import './Navigation.css';

const Navigation = ({ previous, next }) => (
  <footer className="post-navigation">
    {previous ? <PostSummary {...previous} sectionTitle="Previous post" /> : <div />}
    {next ? <PostSummary {...next} sectionTitle="Next post" /> : <div />}
  </footer>
);

Navigation.propTypes = {
  previous: PropTypes.object,
  next: PropTypes.object,
};

export default Navigation;
