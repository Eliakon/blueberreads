import React from 'react';

import PostSummary from '../Common/PostSummary';
import Separator from '../Common/Separator';

import './LatestPosts.css';

const data = {
}

const LatestPosts = () => {
  return (
    <section className="latest-posts">
      <h1>Latest posts</h1>
      <Separator />
      <PostSummary />
      <PostSummary />
      <PostSummary />
      <PostSummary />
    </section>
  )
};

export default LatestPosts;
