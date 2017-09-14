import React from 'react';
import { Link } from 'react-router-dom'

import './Banner.css'

const Banner = () => (
  <header className="banner">
    <Link to="/">
      <img src="/images/logo-large.png" alt="Blueberreads" />
    </Link>
  </header>
)

export default Banner;
