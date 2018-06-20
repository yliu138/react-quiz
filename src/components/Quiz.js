import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import QuestionCount from './QuestionCount';
import AnswerOption from './AnswerOption';
import '../sass/components/quiz.scss';

class Quiz extends React.Component {

    constructor(props) {
        super(props);

        this.renderAnswerOptions = this.renderAnswerOptions.bind(this);
    }

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
      const optionAr = [];
      for (const optionObj of this.props.answerOptions) {
        optionAr.push(this.renderAnswerOptions(optionObj));
      }
      // i.e. should return an array that can assemble a list of react elements
      return (
         <div className="quiz">
           <QuestionCount
             counter={this.props.questionId}
             total={this.props.questionTotal}
           />
           <Question content={this.props.question} />
           <ul className="answerOptions">
             {optionAr}
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