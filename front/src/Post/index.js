import React from 'react';
import marked from 'react-marked';

import { getPost } from '../API';
import Banner from '../Banner';
import Footer from '../Footer';

import BookReview from './BookReview';
import Comments from './Comments';
import Image from './Image';
import Navigation from './Navigation';
import Spinner from '../Spinner';
import Text from './Text';

import './Post.css'


const contentTypes = { BookReview, Image, Text };

const elementForContentType = (item) => {
  const type = contentTypes[item.type];

  if (type) {
    return type({...item});
  }
  console.log('post content type unknown:', item.type);
}

class Post extends React.Component {
  state = {
    appear: false,
    post: {
      title: '',
      displayDate: '',
      intro: '',
      books: [],
      content: [],
    },
    navigation: {},
    comments: [],
  };

  componentDidMount = () => {
    const { post } = this.state;

    getPost(42, (error, json) => {
      if (!error) {
        const { post, navigation, comments } = json;

        this.setState({ post, navigation, comments });
        window.setTimeout(() => this.setState({ appear: true }), 0);
        window.scrollTo(0, 0);
      }
    });
  }

  render = () => {
    const { appear, post, navigation, comments } = this.state;
    const className = appear ? 'appear' : '';
    const { title, displayDate, intro, books, content } = post

    return (
      <div className={`post ${className}`}>
        <Banner />
        <article className="content">
          <header>
            <div className="title">
              <h1>{title}</h1>
              <span className="date">{displayDate}</span>
            </div>
            <div className="books">
              {books.map((coverUrl, n) => <img key={n} src={coverUrl} alt="" style={{animationDelay: `.${n}s`}} />)}
            </div>
          </header>
          <div className='post-intro'>{marked(intro)}</div>
          {content.map((item, n) => elementForContentType({...item, key: n}))}
          <Navigation {...navigation} />
          <Comments comments={comments} />
        </article>
        <Footer />
        <Spinner show={!appear} />
      </div>
    );
  };
};

export default Post;
