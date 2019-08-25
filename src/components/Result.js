import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Result extends Component {
  state = {
    questions: [],
    answers: [],
    result: [],
    timeTaken: 0,
    difficulty: '',
    number: 0
  }

  componentDidMount() {
    console.log('result');
    const questions = this.props.location.state.questions;
    const answers = this.props.location.state.answers;
    const difficulty = this.props.location.state.difficulty;
    const number = parseInt(this.props.location.state.number);
    this.setState({
      difficulty: difficulty, 
      number: number,
      questions: questions,
      answers: answers
    }); 
    this.checkResult(questions, answers)
  }

  checkResult = (questions, answers) => {
    const params = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        questions: questions,
        answers: answers
      })
    };
    fetch('http://localhost:5000/result', params)
      .then(response => response.json())
      .then(data => this.setState({result: data}))
  }

  showCorrectness(idx) {
    if (this.state.result[idx]) {
      return <span role='img' aria-label='right'>&#10004;</span>
    } else {
      return <span role='img' aria-label='wrong'>&#10060;</span>
    }
  }

  render() {
    console.log('render', this.state);
    return (
      <div>
        <center><h1 className='text-blue'>Welcome to Alex's Maths World</h1></center>
        <h5>difficulty: { this.state.difficulty }</h5>
        <h5>number: { this.state.number }</h5>
        <h5>time taken: { this.state.timeTaken }</h5>
        <div className='text-center'>
          {this.state.questions.map((question, idx ) => {
            return <h3 key={idx}>{question} = {this.state.answers[idx]} {this.showCorrectness(idx)}</h3>
          })}
        </div>
        <Link to={{
            pathname: '/',
            state: {
              difficulty: this.state.difficulty,
              number: this.state.number,
            }
          }}>
            <div className='text-center'>Start Again</div>
          </Link>
      </div>
    )
  }
}
