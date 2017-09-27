import PropTypes from 'prop-types';
import React from 'react';

import Pagination from './Pagination';
import PostSummary from './PostSummary';

import './LatestPosts.css';

const LatestPosts = ({ className, posts }) => (
  <section className={`latest-posts ${className}`}>
    <h1 className="section-title">Latest posts</h1>
    {posts.map((post, n) => <PostSummary {...post} key={n} />)}
    <Pagination olderLink="/page/2" newerLink="" />
  </section>
);

LatestPosts.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
};

LatestPosts.defaultProps = {
  className: '',
  posts: [],
};

export default LatestPosts;
