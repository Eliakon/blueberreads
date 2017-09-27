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
  };

  componentDidMount = () => {
    const { page } = this.state;

    getPosts(page, (error, json) => {
      if (!error) {
        const { currentlyReading, latestPosts } = json;

        this.setState({ currentlyReading, latestPosts });
        window.setTimeout(() => this.setState({ appear: true }), 0);
        window.scrollTo(0, 0);
      }
    });
  }

  render = () => {
    const { appear, currentlyReading, latestPosts } = this.state;
    const className = appear ? 'appear' : '';

    return (
      <div className="home">
        <Banner />
        <div className="content">
          <CurrentlyReading className={className} {...currentlyReading} />
          <LatestPosts className={className} posts={latestPosts} />
        </div>
        <Footer />
        <Spinner show={!appear} />
      </div>
    );
  };
};

export default Home;
