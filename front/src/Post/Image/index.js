import PropTypes from 'prop-types';
import React from 'react';
import marked from 'react-marked';

import './Image.css';

const Image = ({ src, caption }) => (
  <div className="post-image">
    <img src={src} alt="" />
    <div className="caption">{marked(caption)}</div>
  </div>
);

Image.propTypes = {
  src: PropTypes.string,
  caption: PropTypes.string,
};

export default Image;
