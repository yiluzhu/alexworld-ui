import React, { Component } from 'react'

export default class Question extends Component {
  state = {
    difficulty: null,
    questions: [],
  }

  componentDidMount() {
    const difficulty = this.props.location.state.difficulty
    const number = this.props.location.state.number
    this.getQuestions(difficulty, number);
  }

  getQuestions = (difficulty, number) => {
    this.setState({difficulty: difficulty})
    let params = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        difficulty: difficulty,
        number: number,
      })
    }
    fetch('http://localhost:5000/questions', params)
      .then(response => response.json())
      .then(data => this.setState({questions: data}))
  }

  render() {
    return (
      <div>
        <center><h1 className='text-blue'>Welcome to Alex's Maths World</h1></center>
        <h5>difficulty: { this.state.difficulty }</h5>
        <div className='text-center'>
          {this.state.questions.map((question, idx ) => {
            return <h3 key={idx}>{question}=<input type="text" /></h3>
          })}
          <input type="submit" value="Submit" />
        </div>
      </div>
    )
  }
}
