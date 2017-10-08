import PropTypes from 'prop-types';
import React from 'react';
import marked from 'react-marked';
import { Link } from 'react-router-dom';

import { mediaHost } from '../../../API';

import './PostSummary.css';
import './PostSummaryResponsive.css';

const PostSummary = ({ id, slug, title, displayDate, intro, books }) => {
  const postUrl = `/post/${id}-${slug}`;

  const book = (url, n) => {
    const wOffset = 10 / books.length;
    const hOffset = 5 / books.length;
    const style = {
      left: `${4 + wOffset * (books.length - n - 1)}rem`,
      top: `${5 - hOffset * (books.length - n - 1)}rem`,
    };
    return (<img key={n} src={`${mediaHost}${url}`} alt="" style={style} />);
  }

  return (
    <article className="post-summary">
      <div className="content">
        <h1>
          <Link to={postUrl}>{title}</Link>
        </h1>
        <span className="date">{displayDate}</span>
        <div className="not-desktop-books not-desktop">
          {books.map((url, n) => <img key={n} src={`${mediaHost}${url}`} alt="" />)}
        </div>
        <div>{marked(intro)}</div>
        <Link to={postUrl} className="post-link">Read more</Link>
      </div>
      <div className="books desktop">
        {books.map((url, n) => book(url, n))}
      </div>
    </article>
  );
};

PostSummary.propTypes = {
  id: PropTypes.number,
  slug: PropTypes.string,
  title: PropTypes.string,
  displayDate: PropTypes.string,
  intro: PropTypes.string,
  books: PropTypes.array,
};

export default PostSummary;
