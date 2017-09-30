import PropTypes from 'prop-types';
import React from 'react';
import marked from 'react-marked';

import Icon from '../../Icon';
import { host } from '../../API';

import './BookReview.css';

const BookReview = ({ book, rating, text, align }) => {
  const { coverUrl, title, author, color } = book;

  const star = (filled, key) => (
    <span key={key}>
      <Icon type={filled ? 'StarFilled' : 'StarUnfilled'} color="#fff" />
    </span>
  );

  return (
    <div className={`post-book-review ${align}`}>
      <article className="book" style={{backgroundColor: `#${color}`}}>
        <h1>{title}</h1>
        <div className="book-data">
          <div className="author-and-rating">
            <h2>by {author}</h2>
            <div className="rating">
              {[...Array(5)].map((_, i) => star(rating > i, i))}
            </div>
          </div>
          <div className="cover">
            <img src={`${host}${coverUrl}`} alt="" />
          </div>
        </div>
      </article>
      <div className="text">
        {marked(text)}
      </div>
    </div>
  );
};

BookReview.propTypes = {
  book: PropTypes.object,
  rating: PropTypes.number,
  text: PropTypes.string,
  alignRight: PropTypes.bool,
};

export default BookReview;
