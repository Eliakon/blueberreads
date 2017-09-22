import React from 'react';

import './CommentForm.css';

class CommentForm extends React.Component {
  state = {
    active: false,
  };

  render = () => (
    <div className="comment-form">
      <h2>Write a comment</h2>
      <form className={this.state.active ? 'active': ''}>
        <textarea onFocus={_ => this.setState({active: true})} placeholder="Your comment" />
        <div className="contact">
          <input className="required" type="text" placeholder="Name" />
          <input type="text" placeholder="Website (optional)" />
          <input type="text" placeholder="@twitter (optional)" />
        </div>
        <input className="submit" type="submit" value="Send" />
      </form>
    </div>
  );
};

export default CommentForm;
