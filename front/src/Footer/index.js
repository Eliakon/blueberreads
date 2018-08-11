import React from 'react';

import Icon from '../Icon';

import './Footer.css';
import './FooterResponsive.css';

const Footer = () => (
  <footer className="about">
    <div className="content">
      <img src="/static/images/maface.png" alt="" />
      <div className="presentation">
        <h2>About me</h2>
        <p>Welcome to Blueberreads!</p>
        <p>
          My name is Estelle, and I am a french compulsive reader.<br />
          I'm training to become a magical girl —the hair is part of it—,
          but in the meantime I develop video games and websites, that may
          or may not be related to magical girls.
        </p>
        <p>I hope yo have a wonderful time on my blog!</p>
        <div className="social">
          <a href="https://www.goodreads.com/user/show/49397473" target="_blank" rel="noopener noreferrer"><Icon type="Goodreads" size="30" /></a>
          <a href="https://twitter.com/blueberreads" target="_blank" rel="noopener noreferrer"><Icon type="Twitter" size="30" /></a>
          <a href="mailto:blueberreads@gmail.com"><Icon type="Mail" size="30" /></a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
