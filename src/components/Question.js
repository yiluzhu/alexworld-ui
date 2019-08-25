import React, { Component } from 'react'

export default class Question extends Component {
  state = {
    questions: [],
    timeTaken: 0,
    difficulty: '',
    number: 0
  }

  componentDidMount() {
    console.log('class Question componentDidMount')
    const difficulty = this.props.location.state.difficulty;
    const number = parseInt(this.props.location.state.number);
    this.setState({difficulty: difficulty, number: number});
    console.log('diff', difficulty, 'number', number);
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
      .then(data => this.setState({questions: data}))
  }

  collectAnswers = (event) => {
    const answers = [...Array(this.state.number).keys()].map(idx => event.target[idx].value);
    console.log('collectAnswers', answers);
    this.props.history.push({
      pathname: '/result',
      state: {
        questions: this.state.questions,
        answers: answers,
        timeTaken: this.state.timeTaken,
        difficulty: this.state.difficulty,
        number: this.state.number
      }
    })
  }

  render() {
    return (
      <div>
        <center><h1 className='text-blue'>Welcome to Alex's Maths World</h1></center>
        <h5>difficulty: { this.state.difficulty }</h5>
        <h5>number: { this.state.number }</h5>
        <div className='text-center'>
          <form onSubmit={this.collectAnswers}>
            {this.state.questions.map((question, idx ) => {
              return <h3 key={idx}>{question}=<input name={idx} type="text" /></h3>
            })}
              <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}
