import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom'

import './PostSummary.css';

const PostSummary = ({ id, slug, title, date, intro, books }) => {
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
        <h1>
          <Link to={postUrl}>{title}</Link>
        </h1>
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

PostSummary.propTypes = {
  id: PropTypes.number,
  slug: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  intro: PropTypes.string,
  books: PropTypes.array,
}

export default PostSummary;
