import PropTypes from 'prop-types';
import React from 'react';
import '../sass/components/question.scss';

class Question extends React.Component {
  render() {
    return (
      <h2 className="question">
        {this.props.content}
      </h2>
    );
  }
}

Question.propTypes = {
  content: PropTypes.string.isRequired
};

export default Question;