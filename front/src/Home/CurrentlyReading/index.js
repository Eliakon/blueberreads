import React from 'react';

import './CurrentlyReading.css';

const data = {
  title: 'The Gentleman\'s Guide to Vice and Virtue',
  author: 'Mackenzi Lee',
  color: '#5fd38d',
  coverUrl: '/images/covers/32319702.jpg',
}

const CurrentlyReading = () => {
  const { title, author, color, coverUrl } = data

  return (
    <article className="currently-reading" style={{backgroundColor: color}}>
      <h1>Currently reading</h1>
      <img src={coverUrl} alt={title} />
      <h2 className="book-title">{title}</h2>
      <h2 className="book-author">by {author}</h2>
    </article>
  )
};

export default CurrentlyReading;
