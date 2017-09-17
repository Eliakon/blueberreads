import React from 'react';

import Banner from '../Banner';

import './Post.css'

const data = {
  id: 1,
  slug: 'august-wrap-up',
  title: 'August wrap-up',
  date: '09-14-2017',
  intro: 'I have read a total of four books this month. I did not expect to read so much, because I planned on reading The Final Empire which is huge. I nonetheless did it! I am quite proud of myself, let me tell you.',
  books: ['/images/covers/15801353.jpg', '/images/covers/6547258.jpg', '/images/covers/17756559.jpg', '/images/covers/22037377.jpg'],
};

const Post = () => {
  const { title, date, intro, books } = data;

  return (
    <div className="post">
      <Banner size="small" />
      <article className="content">
        <header>
          <div className="title">
            <h1>{title}</h1>
            <span className="date">16-09-2017</span>
          </div>
          <div className="books">
            {books.map((coverUrl, n) => <img key={n} src={coverUrl} role="presentation" />)}
          </div>
        </header>
      </article>
    </div>
  )
};

export default Post;
