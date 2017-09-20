import React from 'react';
import marked from 'react-marked';

import Banner from '../Banner';
import Footer from '../Footer';

import BookReview from './BookReview';
import Image from './Image';
import Navigation from './Navigation';
import Text from './Text';

import './Post.css'

const reviewText = `This is the story of Kestrel, a young noble woman living in a colonial territory, where native population has been enslaved.
Kestrel's love interest is actually... Well, the slave she bought at the beginningof the story. How romantic, right?

Furthermore, the slave used to bea nobleman himself (because, colony and slavery, you know?) and used toown a villa in the city.This was an OK read, I guess. It was an entertaining quick-read, whichis akways appreciable.

However, I had very little insterest in the characters: they seemed prettyone-dimensional to me. The romance made no sense, and the colony/slaverytheme made me really uncomfortable. Stockholm Syndrome and shit.`;

const data = {
  id: 1,
  slug: 'august-wrap-up',
  title: 'August wrap-up',
  date: '09-14-2017',
  intro: 'I have read a total of four books this month. I did not expect to read so much, because I planned on reading The Final Empire which is huge.\n\nI nonetheless did it! I am quite proud of myself, let me tell you.',
  books: ['/images/covers/15801353.jpg', '/images/covers/6547258.jpg', '/images/covers/17756559.jpg', '/images/covers/22037377.jpg'],
  content: [
    {
      type: 'BookReview',
      book: {
        'coverUrl': '/images/covers/15801353.jpg',
        'title': 'Aristotle and Dante Discover the Secrets of the Universe',
        'author': 'Benjamin Alire Sáenz',
        'color': '#87cdde',
      },
      rating: 5,
      text: `${reviewText}

${reviewText}`,
    },
    {
      type: 'BookReview',
      book: {
        'coverUrl': '/images/covers/17756559.jpg',
        'title': 'The Winner’s Curse',
        'author': 'Marie Rutkoski',
        'color': '#a02c2c',
      },
      rating: 2,
      text: reviewText,
      alignRight: true,
    },
  ],
};

const contentTypes = { BookReview, Image, Text };

const elementForContentType = (item) => {
  const type = contentTypes[item.type];

  if (type) {
    return type({...item});
  }
  console.log('post content type unknown:', item.type);
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
            <span className="date">{date}</span>
          </div>
          <div className="books">
            {books.map((coverUrl, n) => <img key={n} src={coverUrl} alt="" />)}
          </div>
        </header>
        <div className='post-intro'>{marked(intro)}</div>
        {content.map((item, n) => elementForContentType({...item, key: n}))}
        <Navigation />
      </article>
      <Footer />
    </div>
  )
};

export default Post;
