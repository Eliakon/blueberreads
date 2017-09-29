import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

import './Pagination.css';

const Pagination = ({ page, hasPrevious, hasNext }) => (
  <div className="pagination">
    <Link className={`pagination-link older ${hasPrevious ? '' : 'disabled'}`} to={`/page/${page - 1}`}>Older posts</Link>
    <Link className={`pagination-link newer ${hasNext ? '' : 'disabled'}`} to={`/page/${page + 1}`}>Newer posts</Link>
  </div>
);

Pagination.propTypes = {
  page: PropTypes.number,
  hasPrevious: PropTypes.bool,
  hasNext: PropTypes.bool,
};

export default Pagination;
