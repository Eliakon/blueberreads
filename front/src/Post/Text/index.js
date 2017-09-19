import React, { PropTypes } from 'react';
import marked from 'react-marked';

const Text = ({ text }) => (
  <div className="post-text">
    {marked(text)}
  </div>
);

Text.propTypes = {
  value: PropTypes.string,
};

export default Text;
