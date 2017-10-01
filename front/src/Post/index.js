import PropTypes from 'prop-types';
import React from 'react';
import marked from 'react-marked';

import { comment, getPost } from '../API';
import Banner from '../Banner';
import Footer from '../Footer';

import BookReview from './BookReview';
import Comments from './Comments';
import Image from './Image';
import Navigation from './Navigation';
import Spinner from '../Spinner';
import Text from './Text';

import { host } from '../API';

import './Post.css'


const contentTypes = {
  'book_review': BookReview,
  'image': Image,
  'text': Text,
};

const elementForContentType = (item) => {
  const type = contentTypes[item.contentType];

  if (type) {
    return type({...item});
  }
  console.log('post content type unknown:', item.contentType);
}

class Post extends React.Component {
  static propTypes = {
    match: PropTypes.object,
  };

  static defaultProps = {
    match: {
      params: {},
    },
  };

  state = {
    appear: false,
    post: {
      id: -1,
      title: '',
      displayDate: '',
      intro: '',
      books: [],
      orderedContent: [],
      comments: [],
    },
    navigation: {},
    isSubmittingComment: false,
    commentSubmitSuccess: false,
  };

  handleSubmitComment = (formValues) => {
    const { id:postId } = this.state.post;
    const data = { ...formValues, postId };

    this.setState({ isSubmittingComment: true });
    comment(data, (error, json) => {
      if (!error) {
        const { post } = json;

        this.setState({ post, isSubmittingComment: false, commentSubmitSuccess: true });
        return;
      }
      this.setState({ isSubmittingComment: false, commentSubmitSuccess: false });
    });
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;

    this.getPost(id);
  };

  componentDidUpdate = () => {
    const { id: routeId } = this.props.match.params;
    const { appear, post } = this.state;
    const { id: stateId } = post;

    if (!appear) {
      return;
    }

    if (routeId != stateId) {
      this.setState({ appear: false });
      this.getPost(routeId);
    }
  };

  getPost = (id) => {
    getPost(id, (error, json) => {
      if (!error) {
        const { post, navigation } = json;

        this.setState({ post, navigation });
        window.setTimeout(() => this.setState({ appear: true }), 0);
        window.scrollTo(0, 0);
      }
    });
  };

  render = () => {
    const { appear, post, navigation, isSubmittingComment, commentSubmitSuccess } = this.state;
    const className = appear ? 'appear' : '';
    const { title, displayDate, intro, books, orderedContent } = post

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
              {books.map((coverUrl, n) => <img key={n} src={`${host}${coverUrl}`} alt="" style={{animationDelay: `.${n}s`}} />)}
            </div>
          </header>
          <div className='post-intro'>{marked(intro)}</div>
          {orderedContent.map((item, n) => elementForContentType({...item, key: n}))}
          <Navigation {...navigation} />
          <Comments
            comments={post.comments}
            onSubmitComment={this.handleSubmitComment}
            isSubmittingComment={isSubmittingComment}
            commentSubmitSuccess={commentSubmitSuccess}
          />
        </article>
        <Footer />
        <Spinner show={!appear} />
      </div>
    );
  };
};

export default Post;
