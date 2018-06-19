import React from 'react';
import PropTypes from 'prop-types';
import '../sass/components/result.scss';

function Result(props) {
  return (
    <div className="result">
      You prefer <strong>{props.quizResult}</strong>
    </div>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired,
};

export default Result;