import React from 'react';

import './PostSummary.css';

const data = {
  title: 'August wrap-up',
  date: '09-14-2017',
  intro: 'I have read a total of four books this month. I did not expect to read so much, because I planned on reading The Final Empire which is huge. I nonetheless did it! I am quite proud of myself, let me tell you.',
  books: ['/images/covers/15801353.jpg'],
}

const PostSummary = () => {
  const { title, date, intro, books } = data

  return (
    <article className="post-summary">
      <div className="content">
        <h1>{title}</h1>
        <span className="date">{date}</span>
        <p>{intro}</p>
      </div>
      <div className="books">
        <img src={books[0]} />
      </div>
    </article>
  )
};

export default PostSummary;
