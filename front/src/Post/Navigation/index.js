import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import PostSummary from './PostSummary';

import './Navigation.css';
import './NavigationResponsive.css';

const Navigation = ({ previous, next }) => (
  <div className="post-navigation">
    <Link to="/">Back to home</Link>
    <footer>
      {previous ? <PostSummary {...previous} sectionTitle="Previous post" /> : <div />}
      {next ? <PostSummary {...next} sectionTitle="Next post" /> : <div />}
    </footer>
  </div>
);

Navigation.propTypes = {
  previous: PropTypes.object,
  next: PropTypes.object,
};

export default Navigation;
