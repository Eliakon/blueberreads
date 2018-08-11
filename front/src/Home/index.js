import PropTypes from 'prop-types';
import React from 'react';

import { getPosts } from '../API';
import Banner from '../Banner';
import CurrentlyReading from './CurrentlyReading';
import Footer from '../Footer';
import LatestPosts from './LatestPosts';
import Spinner from '../Spinner';

import './Home.css'
import './HomeResponsive.css';

class Home extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
  };

  static defaultProps = {
    match: {
      params: {},
    },
    history: {
      push: () => {},
    },
  };

  state = {
    appear: false,
    page: 0,
    currentlyReading: {},
    latestPosts: [],
    hasPrevious: false,
    hasNext: false,
  };

  componentDidMount = () => {
    const { page:routePage } = this.props.match.params;
    const page = parseInt(routePage, 10) || 1;

    this.getPosts(page);
  };

  componentDidUpdate = () => {
    const { page: routePage } = this.props.match.params;
    const { appear, page:statePage } = this.state;

    if (!appear || statePage < 1) {
      return;
    }

    if (!routePage) {
      if (statePage !== 1) {
        this.setState({ appear: false });
        this.getPosts(1);
      }
      return;
    }

    if (routePage !== statePage) {
      this.setState({ appear: false });
      this.getPosts(routePage);
    }
  };

  getPosts = (page) => {
    getPosts(page, (error, json) => {
      if (!error) {
        const { currentlyReading, latestPosts, hasPrevious, hasNext } = json;

        this.setState({
          page: json.page,
          currentlyReading,
          latestPosts,
          hasPrevious,
          hasNext,
        });

        const { match, history } = this.props;
        const { page: routePage } = match.params
        if (routePage && routePage !== json.page) {
          history.push(`/page/${json.page}`);
        }

        window.setTimeout(() => this.setState({ appear: true }), 0);
        window.scrollTo(0, 0);
      }
    });
  };

  render = () => {
    const { appear, page, currentlyReading, latestPosts, hasPrevious, hasNext } = this.state;
    const className = appear ? 'appear' : '';

    return (
      <div className="home">
        <Banner />
        <div className="content">
          <CurrentlyReading className={className} {...currentlyReading} />
          <LatestPosts className={className} posts={latestPosts} page={page} hasPrevious={hasPrevious} hasNext={hasNext} />
        </div>
        <Footer />
        <Spinner show={!appear} />
      </div>
    );
  };
};

export default Home;
