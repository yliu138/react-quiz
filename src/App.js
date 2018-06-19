import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Quiz from './components/Quiz';
import Result from './components/Result';
import quizQuestions from './api/quizQuestions';
import update from 'react-addons-update';

class App extends Component {
  constructor(props) {
   super(props);

   this.state = {
    counter: 0,
    questionId: 1,
    question: '',
    answerOptions: [],
    answer: '',
    answersCount: {
      nintendo: 0,
      microsoft: 0,
      sony: 0
    },
    result: ''
   };

   this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
 }

 setResults (result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

 getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

 setNextQuestion() {
   const counter = this.state.counter + 1;
   const questionId = this.state.questionId + 1;
   this.setState({
     counter,
     questionId,
     question: quizQuestions[counter].question,
     answerOptions: quizQuestions[counter].answers,
     answer: ''
   });
 }

 setUserAnswer(answer) {
   // Update API actually create a new object e.g. updatedAnswersCount rahter than
   // modify the original state model directly
   // this helps track a list of user attempted rather than just only one final answer
   // Don't change the state directly as calling setState() afterwards might replace the change you made
   // To change the answer value to lower case
   answer = answer.toLowerCase();
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: {$apply: (currentValue) => currentValue + 1}
    });
    // The DOM will not be re-rendered until we call setState
    this.setState({
      answersCount: updatedAnswersCount,
      answer: answer
    });
  }

 handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
      } else {
        setTimeout(() => this.setResults(this.getResults()), 300);
      }
  }

 shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element randomly...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

 componentWillMount() {
   const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
   this.setState({
     question: quizQuestions[0].question,
     answerOptions: shuffledAnswerOptions[0]
   });
 }

 // To reqnder the quiz
 renderQuiz() {
   return (
     <Quiz
       answer={this.state.answer}
       answerOptions={this.state.answerOptions}
       questionId={this.state.questionId}
       question={this.state.question}
       questionTotal={quizQuestions.length}
       onAnswerSelected={this.handleAnswerSelected}
       counter={quizQuestions.length}
     />
  );
 }

 renderResult() {
   return (
     <Result
       quizResult={this.state.result}
     />
   )
 }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Quiz</h1>
        </header>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default App;
