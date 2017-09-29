import React from 'react';

import { getPosts } from '../API';
import Banner from '../Banner';
import CurrentlyReading from './CurrentlyReading';
import Footer from '../Footer';
import LatestPosts from './LatestPosts';
import Spinner from '../Spinner';

import './Home.css'

class Home extends React.Component {
  state = {
    appear: false,
    page: 0,
    currentlyReading: {},
    latestPosts: [],
    hasPrevious: false,
    hasNext: false,
  };

  componentDidMount = () => {
    const { page } = this.state;

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
        window.setTimeout(() => this.setState({ appear: true }), 0);
        window.scrollTo(0, 0);
      }
    });
  }

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
