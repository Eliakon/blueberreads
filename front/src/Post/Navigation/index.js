import PropTypes from 'prop-types';
import React from 'react';

import PostSummary from './PostSummary';

import './Navigation.css';

const Navigation = ({ previous, next }) => (
  <footer className="post-navigation">
    {previous ? <PostSummary {...previous} sectionTitle="Previous post" /> : null}
    {next ? <PostSummary {...next} sectionTitle="Next post" /> : null}
  </footer>
);

Navigation.propTypes = {
  previous: PropTypes.object,
  next: PropTypes.object,
};

export default Navigation;
