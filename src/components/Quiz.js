import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question'
import QuestionCount from './QuestionCount'
import AnswerOption from './AnswerOption'

class Quiz extends React.Component {
    renderAnswerOptions(key) {
        return (
          <AnswerOption
            key={key.content}
            answerContent={key.content}
            answerType={key.type}
            answer={this.props.answer}
            questionId={this.props.questionId}
            onAnswerSelected={this.props.onAnswerSelected}
          />
        );
    }

    render() {
      return (
         <div className="quiz">
           <QuestionCount
             counter={this.props.questionId}
             total={this.props.questionTotal}
           />
           <Question content={this.props.question} />
           <ul className="answerOptions">
             {this.props.answerOptions.map(this.renderAnswerOptions)}
           </ul>
         </div>
      );
    }
  }

  Quiz.propTypes = {
    answer: PropTypes.string.isRequired,
    answerOptions: PropTypes.array.isRequired,
    counter: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
  };

  export default Quiz;