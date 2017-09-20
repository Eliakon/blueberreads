import React from 'react';

import Comment from './Comment';

import './Comments.css';

const data = {
  page: 1,
  pagesCount: 3,
  commentsCount: 42,
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

class Comments extends React.Component {
  render = () => {
    const { commentsCount, comments } = data;

    return (
      <section className="post-comments">
        <h1>{commentsCount > 0 ? `${commentsCount} comments` : 'No comment yet'}</h1>
        {
          commentsCount > 0
            ?
              <div>
                {comments.map((comment, n) => <Comment {...comment} key={n} />)}
                <button className="new-comment">Write a comment</button>
              </div>
            : <div>[Comment form]</div>
        }
      </section>
    );
  }
};

export default Comments;
