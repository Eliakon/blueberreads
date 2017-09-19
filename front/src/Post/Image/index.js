import React, { PropTypes } from 'react';
import marked from 'react-marked';

import './Image.css';

const Image = ({ src, caption }) => (
  <div className="post-image">
    <img src={src} role="presentation" />
    <div className="caption">{marked(caption)}</div>
  </div>
);

Image.propTypes = {
  src: PropTypes.string,
  caption: PropTypes.string,
};

export default Image;
