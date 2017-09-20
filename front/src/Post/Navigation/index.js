import React from 'react';

import PostSummary from './PostSummary';

import './Navigation.css';

const data = {
  previous: {
    id: 1,
    slug: 'august-wrap-up',
    title: 'August wrap-up',
    date: '09-14-2017',
    books: ['/images/covers/15801353.jpg', '/images/covers/6547258.jpg', '/images/covers/17756559.jpg', '/images/covers/22037377.jpg'],
  },
  next: {
    id: 2,
    slug: 'top-5-middle-grade-books',
    title: 'Top 5 middle grade books of all time',
    date: '09-06-2017',
    books: ['/images/covers/5985499.jpg', '/images/covers/11476291.jpg', '/images/covers/17349203.jpg', '/images/covers/24926015.jpg', '/images/covers/25658499.jpg'],
  },
};

const Navigation = () => (
  <footer className="post-navigation">
    {data.previous ? <PostSummary {...data.previous} sectionTitle="Previous post" /> : null}
    {data.next ? <PostSummary {...data.next} sectionTitle="Next post" /> : null}
  </footer>
);

export default Navigation;
