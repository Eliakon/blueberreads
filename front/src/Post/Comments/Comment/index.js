import PropTypes from 'prop-types';
import React from 'react';
import marked from 'react-marked';

import Icon from '../../../Icon';

import './Comment.css';

const Comment = ({ pseudo, date, website, twitter, text, isAdmin }) => (
  <div className={`post-comment ${isAdmin ? 'admin' : ''}`}>
    <div className="avatar-and-pseudo">
      <div>
        <h3 className="pseudo">{pseudo}</h3>
        <span className="date">{date}</span>
        <div className="links">
          {website ? <a href={website} target="_blank"><Icon type="Link" size="20" /></a> : null}
          {twitter ? <a href={`http://twitter.com/${twitter}`} target="_blank"><Icon type="Twitter" size="20" /></a> : null}
        </div>
      </div>
      {isAdmin ? <div className="admin-avatar"><img src="/images/maface.png" alt="" /></div> : null}
    </div>
    <div className="text">{marked(text)}</div>
  </div>
);

Comment.propTypes = {
  pseudo: PropTypes.string,
  date: PropTypes.string,
  website: PropTypes.string,
  twitter: PropTypes.string,
  text: PropTypes.string,
  isAdmin: PropTypes.bool,
};

export default Comment;
