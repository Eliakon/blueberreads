import React from 'react';

import Banner from '../Banner';
import Footer from '../Footer';
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
    <Footer />
  </div>
);

export default Home;
