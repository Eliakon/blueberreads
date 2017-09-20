import React from 'react';

import Pagination from './Pagination';
import PostSummary from './PostSummary';

import './LatestPosts.css';

const data = {
  posts: [
    {
      id: 1,
      slug: 'august-wrap-up',
      title: 'August wrap-up',
      date: '09-14-2017',
      intro: 'I have read a total of four books this month. I did not expect to read so much, because I planned on reading The Final Empire which is **huge**.\n\nI nonetheless did it! I am quite proud of myself, let me tell you.',
      books: ['/images/covers/15801353.jpg', '/images/covers/6547258.jpg', '/images/covers/17756559.jpg', '/images/covers/22037377.jpg'],
    },
    {
      id: 2,
      slug: 'top-5-middle-grade-books',
      title: 'Top 5 middle grade books of all time',
      date: '09-06-2017',
      intro: 'As you may know by now, I am a huge middle-grade books fan! Fun fact: I was more attracted to adult books when in high school... And more attracted to middle-grade books now that I’m—presumably—an adult! So, here is a my top 5 favorite middle-grade books of all time.\n\n**Disclaimer:** it may include witches.',
      books: ['/images/covers/5985499.jpg', '/images/covers/11476291.jpg', '/images/covers/17349203.jpg', '/images/covers/24926015.jpg', '/images/covers/25658499.jpg'],
    },
    {
      id: 3,
      slug: 'the-final-empire-review-with-spoilers',
      title: 'The Final Empire review (with spoilers!)',
      date: '09-01-2017',
      intro: 'I’m very excited to talk to you about this book, as this is my first ever buddy-read! So, The Final Empire by Brandon Sanderson is the first book in the Mistborn trilogy. Here are my thoughts about it.',
      books: ['/images/covers/6547258.jpg'],
    },
  ],
};

const LatestPosts = () => {
  return (
    <section className="latest-posts">
      <h1>Latest posts</h1>
      {data.posts.map((post, n) => <PostSummary {...post} key={n} />)}
      <Pagination olderLink="/page/2" newerLink="" />
    </section>
  );
};

export default LatestPosts;
