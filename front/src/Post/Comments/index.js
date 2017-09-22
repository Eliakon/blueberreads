import React from 'react';

import Comment from './Comment';
import CommentForm from './CommentForm';

import Icon from '../../Icon';

import './Comments.css';

const data = {
  comments: [
    {
      pseudo: 'Potichat',
      website: 'http://icanhas.cheezburger.com',
      text: 'Meow, meow :3',
      date: '1 day ago',
    },
    {
      pseudo: 'Mallow le chat',
      text: 'However, I had very little insterest in the characters: they seemed pretty one-dimensional to me.\n\nThe romance made no sense, and the colony/slavery theme made me really uncomfortable. Stockholm Syndrome and shit.',
      date: '1 year ago',
    },
    {
      pseudo: 'Chuck Norris',
      website: 'http://chucknorris.com/',
      twitter: 'chucknorris',
      text: 'Amazing.',
      date: '12 hours ago',
    },
    {
      pseudo: 'Blueberreads',
      text: 'However, I had very little insterest in the characters: they seemed pretty one-dimensional to me. The romance made no sense, and the colony/slavery theme made me really uncomfortable. Stockholm Syndrome and shit.',
      date: '15 minutes ago',
      isAdmin: true,
    },
  ],
};

const Comments = () => {
  const { comments } = data;

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

export default Comments;
