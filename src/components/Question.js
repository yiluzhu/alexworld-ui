import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

var rootUrl = 'https://be-4imylu4s7a-ew.a.run.app';  // 'http://localhost:5000';


export default class Question extends Component {
  state = {
    questions: [],
    submittedAnswers: [],
    correctAnswers: [],
    result: [],
    startTime: 0,
    difficulty: '',
    number: 0,
    showAnswerFlag: false
  }

  componentDidMount() {
    if (this.props.location.state !== undefined ) {
      const difficulty = this.props.location.state.difficulty;
      const number = parseInt(this.props.location.state.number);
      this.setState({difficulty: difficulty, number: number});
      console.log('Question - componentDidMount - difficulty', difficulty, 'number', number);
      this.getQuestions(difficulty, number)
    }
  }

  getQuestions = (difficulty, number) => {
    const params = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        difficulty: difficulty,
        number: number
      })
    };
    fetch(rootUrl + '/questions', params)
      .then(response => response.json())
      .then(data => this.setState({questions: data, startTime: Date.now()}))
  }

  checkResult = (event) => {
    event.preventDefault();
    this.setState({timeTaken: Date.now() - this.state.startTime});
    const submittedAnswers = [...Array(this.state.number).keys()].map(
      idx => event.target[idx].value);
    console.log('Question - submittedAnswers', submittedAnswers);
    const params = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        questions: this.state.questions,
        submittedAnswers: submittedAnswers
      })
    };
    fetch(rootUrl + '/result', params)
      .then(response => response.json())
      .then(data => this.setState({
        submittedAnswers: submittedAnswers, 
        correctAnswers: data.correct_answers, 
        result: data.result}))
  }

  getResultEmoji = (idx) => {
    if (this.state.result.length === 0) {
      return ''
    } else if (this.state.result[idx]) {
      return <span role='img' aria-label='right'>&#10004;</span>
    } else {
      return <span role='img' aria-label='wrong'>&#10060;</span>
    }
  }
  
  displayTimeTaken = () => {
    if (this.state.timeTaken > 0) {
      return (
        <h5 className='text-right mt'>Time taken: {(this.state.timeTaken / 1000).toFixed(1) } seconds</h5>
      )
    } else {
      return ''
    }
  }

  showAnswers = () => {
    this.setState({showAnswerFlag: !this.state.showAnswerFlag})
  }

  showAnswerText = () => {
    if (this.state.showAnswerFlag) {
      return 'Hide Answers'
    } else {
      return 'Show Answers'
    }
  }

  getCorrectAnswers = (idx) => {
    if (this.state.showAnswerFlag) {
      return this.state.correctAnswers[idx]
    } else {
      return ''
    }
  }

  render() {
    return (
      <div>
        <center><h1 className='text-blue'>Welcome to Alex's Maths World</h1></center>
        <Link to='/'>
          <div className='text-right mt'>START AGAIN</div>
        </Link>
        <h5 className='mt'>Difficulty: { this.state.difficulty }</h5>
        <h5 className='mt'>Number: { this.state.number }</h5>
        <div className='text-center'>
          <form onSubmit={this.checkResult}>
            {this.state.questions.map((question, idx) => {
              return (
                <h3 key={idx}>
                  <Container>
                    <Row>
                      <Col xs={6} className='text-left'>{question}</Col>
                      <Col className='text-left'>= <input name={idx} type="text" size='5'/></Col>
                      <Col xs={1}> {this.getResultEmoji(idx)}</Col>
                      <Col >{this.getCorrectAnswers(idx)}</Col>
                    </Row>
                  </Container>
                </h3>
              )
            })}
            <br/><br/><br/>
            <input type="submit" value="Submit" />
          </form>
          <br/> 
          <button onClick={this.showAnswers}>{this.showAnswerText()}</button>
          <br/>
        </div>
        {this.displayTimeTaken()}
      </div>
    )
  }
}
