import PropTypes from 'prop-types';
import React from 'react';

import Pagination from './Pagination';
import PostSummary from './PostSummary';

import './LatestPosts.css';
import './LatestPostsResponsive.css';

const LatestPosts = ({ className, posts, page, hasPrevious, hasNext }) => (
  <section className={`latest-posts ${className}`}>
    <h1 className="section-title">Latest posts</h1>
    {posts.map((post, n) => <PostSummary {...post} key={n} />)}
    <Pagination page={page} hasPrevious={hasPrevious} hasNext={hasNext} />
  </section>
);

LatestPosts.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
  page: PropTypes.number,
  hasPrevious: PropTypes.bool,
  hasNext: PropTypes.bool,
};

LatestPosts.defaultProps = {
  className: '',
  posts: [],
  page: 0,
  hasPrevious: false,
  hasNext: false,
};

export default LatestPosts;
