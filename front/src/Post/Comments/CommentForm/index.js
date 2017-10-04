import PropTypes from 'prop-types';
import React from 'react';

import './CommentForm.css';
import './CommentFormResponsive.css';

class CommentForm extends React.Component {
  static propTypes = {
    onSubmitComment: PropTypes.func,
    isSubmittingComment: PropTypes.bool,
    commentSubmitSuccess: PropTypes.bool,
  };

  static defaultProps = {
    onSubmitComment: () => {},
    isSubmittingComment: false,
    commentSubmitSuccess: false,
  };

  state = {
    active: false,
    isSubmitting: false,
    formValues: {
      pseudo: '',
      website: '',
      twitter: '',
      text: '',
    },
  };

  handleSubmit = (evt) => {
    const { formValues } = this.state;
    const { onSubmitComment } = this.props;

    evt.preventDefault();
    onSubmitComment(formValues);
  };

  storeFormValue = (name, value) => {
    const { formValues } = this.state;

    this.setState({
      formValues: {
        ...formValues,
        [name]: value,
      },
    });
  };

  valueLink = (name) => {
    const { formValues } = this.state;
    return {
      value: formValues[name],
      requestChange: (newValue) => this.storeFormValue(name, newValue),
    }
  };

  componentDidUpdate = () => {
    const { isSubmittingComment, commentSubmitSuccess } = this.props;
    const { isSubmitting } = this.state;

    if (isSubmitting != isSubmittingComment) {
      if (isSubmittingComment) {
        // Request has just been sent
        this.setState({ isSubmitting: isSubmittingComment});
      }
      else {
        // Response from server has just been received
        if (commentSubmitSuccess) {
          const { formValues } = this.state;
          this.setState({
            formValues: {
              ...formValues,
              text: '',
            },
            isSubmitting: isSubmittingComment,
          });
        }
      }
    }
  };

  render = () => {
    const { isSubmittingComment, commentSubmitSuccess } = this.props;

    return (
      <div className="comment-form">
        <h2>Write a comment</h2>
        <form onSubmit={this.handleSubmit} className={this.state.active ? 'active': ''}>
          <textarea name="text" valueLink={this.valueLink('text')} onFocus={_ => this.setState({active: true})} placeholder="Your comment" />
          <div className="contact">
            <input name="pseudo" valueLink={this.valueLink('pseudo')} className="required" type="text" placeholder="Name" />
            <input name="website" valueLink={this.valueLink('website')} type="text" placeholder="Website (optional)" />
            <input name="twitter" valueLink={this.valueLink('twitter')} type="text" placeholder="@twitter (optional)" />
          </div>
          <input className="submit" type="submit" value="Send" />
        </form>
        <div className={isSubmittingComment ? 'overlay' : ''} />
      </div>
    );
  };
};

export default CommentForm;
