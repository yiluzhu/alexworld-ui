import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class Question extends Component {
  state = {
    questions: [],
    startTime: 0,
    difficulty: '',
    number: 0
  }

  componentDidMount() {
    const difficulty = this.props.location.state.difficulty;
    const number = parseInt(this.props.location.state.number);
    this.setState({difficulty: difficulty, number: number});
    console.log('Question - componentDidMount - difficulty', difficulty, 'number', number);
    this.getQuestions(difficulty, number)
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
    fetch('http://localhost:5000/questions', params)
      .then(response => response.json())
      .then(data => this.setState({questions: data, startTime: Date.now()}))
  }

  collectAnswers = (event) => {
    const answers = [...Array(this.state.number).keys()].map(idx => event.target[idx].value);
    console.log('collectAnswers', answers);
    this.props.history.push({
      pathname: '/result',
      state: {
        questions: this.state.questions,
        answers: answers,
        timeTaken: Date.now() - this.state.startTime,
        difficulty: this.state.difficulty,
        number: this.state.number
      }
    })
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
          <form onSubmit={this.collectAnswers}>
            {this.state.questions.map((question, idx ) => {
              return (
                <h3 key={idx}>
                  <Container>
                    <Row>
                      <Col xs={6} className='text-left'>{question}</Col>
                      <Col className='text-left'>= <input name={idx} type="text" size='5'/></Col>
                    </Row>
                  </Container>
                </h3>
              )
            })}
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}
