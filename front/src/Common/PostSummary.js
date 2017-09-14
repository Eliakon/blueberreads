import React from 'react';
import { Link } from 'react-router-dom'

import './PostSummary.css';

const data = {
  id: 1,
  slug: 'august-wrap-up',
  title: 'August wrap-up',
  date: '09-14-2017',
  intro: 'I have read a total of four books this month. I did not expect to read so much, because I planned on reading The Final Empire which is huge. I nonetheless did it! I am quite proud of myself, let me tell you.',
  books: ['/images/covers/15801353.jpg', '/images/covers/6547258.jpg', '/images/covers/17756559.jpg', '/images/covers/22037377.jpg'],
}

const PostSummary = () => {
  const { id, slug, title, date, intro, books } = data;

  const postUrl = `/post/${id}-${slug}`;

  const book = (url, n) => {
    const wOffset = 8 / books.length;
    const hOffset = 5 / books.length;
    const style = {
      left: `${10 - wOffset * n}rem`,
      top: `${hOffset * n}rem`,
    };
    return (<img key={n} src={url} role="presentation" style={style} />);
  }

  return (
    <article className="post-summary">
      <div className="content">
        <h1>{title}</h1>
        <span className="date">{date}</span>
        <p>{intro}</p>
        <Link to={postUrl} className="post-link">Read more</Link>
      </div>
      <div className="books">
        {books.map((url, n) => book(url, n))}
      </div>
    </article>
  )
};

export default PostSummary;
