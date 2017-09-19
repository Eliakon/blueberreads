import React from 'react';
import marked from 'react-marked';

import Banner from '../Banner';

import Image from './Image';
import Text from './Text';

import './Post.css'

const data = {
  id: 1,
  slug: 'august-wrap-up',
  title: 'August wrap-up',
  date: '09-14-2017',
  intro: 'I have read a total of four books this month. I did not expect to read so much, because I planned on reading The Final Empire which is huge. I nonetheless did it! I am quite proud of myself, let me tell you.',
  books: ['/images/covers/15801353.jpg', '/images/covers/6547258.jpg', '/images/covers/17756559.jpg', '/images/covers/22037377.jpg'],
  content: [
    {
      type: 'text',
      text: 'I’ve THIS IS A TEST **coucou**.',
    },
    {
      type: 'text',
      text: 'And this is a another test.\n\nWith a second line in it.',
    },
    {
      type: 'image',
      src: '/images/covers/15801353.jpg',
      caption: 'Wow, a book cover!\n\nAmazing.',
    },
  ],
};

const contentTypes = {
  image: Image,
  text: Text,
}

const elementForContentType = (item) => {
  const type = contentTypes[item.type];

  if (type) {
    return type({...item});
  }
  console.log('type unknown:', item.type);
}

const Post = () => {
  const { title, date, intro, books, content } = data;

  return (
    <div className="post">
      <Banner size="small" />
      <article className="content">
        <header>
          <div className="title">
            <h1>{title}</h1>
            <span className="date">16-09-2017</span>
          </div>
          <div className="books">
            {books.map((coverUrl, n) => <img key={n} src={coverUrl} role="presentation" />)}
          </div>
        </header>
        <div className='post-intro'>{marked(intro)}</div>
        {content.map((item, n) => elementForContentType({...item, key: n}))}
      </article>
    </div>
  )
};

export default Post;
