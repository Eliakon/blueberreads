import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { mediaHost } from '../../../API';

import './PostSummary.css';
import './PostSummaryResponsive.css';

const PostSummary = ({ id, slug, title, displayDate, books, sectionTitle }) => {
  const postUrl = `/post/${id}-${slug}`;

  return (
    <section className="navigation-post-summary">
      <h1>{sectionTitle}</h1>
      <article className="summary">
        <div>
          <h1>
            <Link to={postUrl}>{title}</Link>
          </h1>
          <span className="date">{displayDate}</span>
          <div className="books">
            {books.map((url, n) => <div className="book"><img src={`${mediaHost}${url}`} alt="" key={n} /></div>)}
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
  displayDate: PropTypes.string,
  intro: PropTypes.string,
  books: PropTypes.array,
  sectionTitle: PropTypes.string,
};

export default PostSummary;
