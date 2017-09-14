import React from 'react';

import Banner from '../Banner';
import CurrentlyReading from './CurrentlyReading';
import LatestPosts from './LatestPosts';

import './Home.css'

const Home = () => (
  <div className="home">
    <Banner />
    <div className="content">
      <CurrentlyReading />
      <LatestPosts />
    </div>
  </div>
);

export default Home;
