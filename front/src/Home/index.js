import React from 'react';

import Banner from '../Banner';
import Footer from '../Footer';
import CurrentlyReading from './CurrentlyReading';
import LatestPosts from './LatestPosts';

import './Home.css'

class Home extends React.Component {
  state = {
    appear: false,
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    window.setTimeout(() => this.setState({ appear: true }), 0);
  }

  render = () => {
    const className = this.state.appear ? 'appear' : '';

    return (
      <div className="home">
        <Banner />
        <div className="content">
          <CurrentlyReading className={className} />
          <LatestPosts className={className} />
        </div>
        <Footer />
      </div>
    );
  };
};

export default Home;
