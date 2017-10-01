import PropTypes from 'prop-types';
import React from 'react';

import Comment from './Comment';
import CommentForm from './CommentForm';

import Icon from '../../Icon';

import './Comments.css';

const Comments = ({ comments, onSubmitComment, isSubmittingComment, commentSubmitSuccess }) => {
  const commentsElements = (
    <div>
      {comments.map((comment, n) => <Comment {...comment} key={n} />)}
    </div>
  );

  return (
    <section className="post-comments">
      <h1>Discussion <Icon type="Discussion" size="25" /></h1>
      {comments.length > 0 ? <h2>{comments.length} comment{comments.length > 1 ? 's' : ''}</h2> : null}
      {comments.length > 0 ? commentsElements : null}
      <CommentForm onSubmitComment={onSubmitComment} isSubmittingComment={isSubmittingComment} commentSubmitSuccess={commentSubmitSuccess} />
    </section>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
  onSubmitComment: PropTypes.func,
  isSubmittingComment: PropTypes.bool,
  commentSubmitSuccess: PropTypes.bool,
};

Comments.defaultProps = {
  comments: [],
  onSubmitComment: () => {},
  isSubmittingComment: false,
  commentSubmitSuccess: false,
};

export default Comments;
