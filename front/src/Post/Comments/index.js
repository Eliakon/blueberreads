import PropTypes from 'prop-types';
import React from 'react';

import Comment from './Comment';
import CommentForm from './CommentForm';

import Icon from '../../Icon';

import './Comments.css';

const Comments = ({ comments }) => {
  const commentsElements = (
    <div>
      {comments.map((comment, n) => <Comment {...comment} key={n} />)}
    </div>
  );

  return (
    <section className="post-comments">
      <h1>Discussion <Icon type="Discussion" size="25" /></h1>
      {comments.length > 0 ? <h2>{comments.length} comments</h2> : null}
      {comments.length > 0 ? commentsElements : null}
      <CommentForm />
    </section>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
};

Comments.defaultProps = {
  comments: [],
};

export default Comments;
