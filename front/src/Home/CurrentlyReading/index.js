import PropTypes from 'prop-types';
import React from 'react';

import { mediaHost } from '../../API';

import './CurrentlyReading.css';
import './CurrentlyReadingResponsive.css';

const CurrentlyReading = ({ className, title, author, color, coverUrl }) => (
  <article className={`currently-reading ${className}`}>
    <div className="background" style={{backgroundColor: `#${color}`}} />
    <h1>Currently reading</h1>
    <img src={`${mediaHost}${coverUrl}`} alt={title} />
    <h2 className="book-title">{title}</h2>
    <h2 className="book-author">by {author}</h2>
  </article>
);

CurrentlyReading.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  color: PropTypes.string,
  coverUrl: PropTypes.string,
};

CurrentlyReading.defaultProps = {
  className: '',
  title: '',
  author: '',
  color: 'transparent',
  coverUrl: '',
};

export default CurrentlyReading;
