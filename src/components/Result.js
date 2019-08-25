import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class Result extends Component {
  state = {
    questions: [],
    submittedAnswers: [],
    correctAnswers: [],
    result: [],
    timeTaken: 0,
    difficulty: '',
    number: 0
  }

  componentDidMount() {
    console.log('result');
    const questions = this.props.location.state.questions;
    const submittedAnswers = this.props.location.state.answers;
    const difficulty = this.props.location.state.difficulty;
    const number = parseInt(this.props.location.state.number);
    const timeTaken = this.props.location.state.timeTaken;
    this.setState({
      difficulty: difficulty, 
      number: number,
      timeTaken: timeTaken,
      questions: questions,
      submittedAnswers: submittedAnswers
    }); 
    this.checkResult(questions, submittedAnswers)
  }

  checkResult = (questions, submittedAnswers) => {
    const params = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        questions: questions,
        submittedAnswers: submittedAnswers
      })
    };
    fetch('http://localhost:5000/result', params)
      .then(response => response.json())
      .then(data => this.setState({correctAnswers: data.correct_answers, result: data.result}))
  }

  getResultEmoji(idx) {
    if (this.state.result[idx]) {
      return <span role='img' aria-label='right'>&#10004;</span>
    } else {
      return <span role='img' aria-label='wrong'>&#10060;</span>
    }
  }

  maskSubmittedAnswers(idx) {
    if (this.state.result[idx]) {
      return this.state.correctAnswers[idx]
    } else {
      return this.state.submittedAnswers[idx]
    }
  }

  render() {
    return (
      <div>
        <center><h1 className='text-blue'>Welcome to Alex's Maths World</h1></center>
        <Link to='/'>
          <div className='text-right'>HOME</div>
        </Link>
        <h5>difficulty: { this.state.difficulty }</h5>
        <h5>number: { this.state.number }</h5>
        <div className='text-center'>
          {this.state.questions.map((question, idx) => {
            return (
              <h3 key={idx}>
                <Container>
                  <Row>
                    <Col xs={5} className='text-left'>{question}</Col>
                    <Col xs={2} className='text-left'>= {this.maskSubmittedAnswers(idx)}</Col>
                    <Col xs={1}> {this.getResultEmoji(idx)}</Col>
                  </Row>
                </Container>
              </h3>
            )
          })}
        </div>
        <h5 className='text-right'>time taken: { this.state.timeTaken } milliseconds</h5>
      </div>
    )
  }
}
