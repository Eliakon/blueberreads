import React, { PropTypes } from 'react';

import { Link } from 'react-router-dom';

import './Pagination.css';

const Pagination = ({ olderLink, newerLink }) => (
  <div className="pagination">
    <Link className={`pagination-link older ${olderLink ? '' : 'disabled'}`} to={olderLink}>Older posts</Link>
    <Link className={`pagination-link newer ${newerLink ? '' : 'disabled'}`} to={newerLink}>Newer posts</Link>
  </div>
);

Pagination.propTypes = {
  olderLink: PropTypes.string,
  newerLink: PropTypes.string,
};

export default Pagination;
