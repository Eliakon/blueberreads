import PropTypes from 'prop-types';
import React from 'react';
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
