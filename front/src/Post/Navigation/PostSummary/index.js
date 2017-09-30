import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { host } from '../../../API';

import './PostSummary.css';

const PostSummary = ({ id, slug, title, date, books, sectionTitle }) => {
  const postUrl = `/post/${id}-${slug}`;

  return (
    <section className="navigation-post-summary">
      <h1>{sectionTitle}</h1>
      <article className="summary">
        <div>
          <h1>
            <Link to={postUrl}>{title}</Link>
          </h1>
          <span className="date">{date}</span>
          <div className="books">
            {books.map((url, n) => <div className="book"><img src={`${host}${url}`} key={n} /></div>)}
          </div>
        </div>
        <Link to={postUrl} className="post-link">Read more</Link>
      </article>
  </section>
  );
};

PostSummary.propTypes = {
  id: PropTypes.number,
  slug: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  intro: PropTypes.string,
  books: PropTypes.array,
  sectionTitle: PropTypes.string,
};

export default PostSummary;
