import PropTypes from 'prop-types';
import React from 'react';
import marked from 'react-marked';

import Icon from '../../../Icon';

import './Comment.css';

const Comment = ({ pseudo, date, website, twitter, text, isAdmin }) => (
  <div className={`post-comment ${isAdmin ? 'admin' : ''}`}>
    <div className="avatar-and-pseudo">
      {isAdmin ? <img className="admin-avatar" src="/images/maface.png" alt="" /> : null}
      <div>
        <h3 className="pseudo">
          {website ? <a href={website} target="_blank">{pseudo}</a> : pseudo}
          {twitter ? <a className="twitter" href={`http://twitter.com/${twitter}`} target="_blank"><Icon type="TwitterBird" size="15" /></a> : null}
        </h3>
        <span className="date">{date}</span>
      </div>
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
