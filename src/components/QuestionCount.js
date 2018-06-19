import React from 'react';
import PropTypes from 'prop-types';
import '../sass/components/question-count.scss';

class QuestionCount extends React.Component {
  render() {
    return (
      <div className="questionCount">
        Question <span>{this.props.counter}</span> of <span>{this.props.total}</span>
      </div>
    );
  }
}

  QuestionCount.propTypes = {
    counter: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  };

  export default QuestionCount;