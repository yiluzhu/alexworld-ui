import React, { Component } from 'react'

export default class Question extends Component {
  state = {
    questions: [],
    answers: [],
    result: [],
    timeTaken: 0,
    difficulty: '',
    number: 0
  }

  constructor(props) {
    super(props);
    console.log('constructor')
  }

  componentDidMount() {
    console.log('did mount')
    if (this.props.location.state !== undefined) {
      console.log('---1')
      const difficulty = this.props.location.state.difficulty;
      const number = parseInt(this.props.location.state.number);
      this.setState({difficulty: difficulty, number: number});
      console.log('diff', difficulty, 'number', number);
      this.getQuestions(difficulty, number)
    }
    console.log('---2', this.state)
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

  checkResult = (event) => {
    const answers = [...Array(this.number).keys()].map(idx => event.target[idx].value);
    this.setState({answers: answers});
    console.log('answers are ', answers);
    const params = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        questions: this.state.questions,
        answers: answers
      })
    };
    fetch('http://localhost:5000/check', params)
      .then(response => response.json())
      // .then(data => this.setState({result: data.result, timeTaken: data.time_taken}))
      .then(data => console.log('---data', data))
    }

  render() {
    return (
      <div>
        <center><h1 className='text-blue'>Welcome to Alex's Maths World</h1></center>
        <h5>difficulty: { this.state.difficulty }</h5>
        <h5>number: { this.state.number }</h5>
        <h5>time taken: { this.state.timeTaken }</h5>
        <div className='text-center'>
          <form onSubmit={this.checkResult}>
            {this.state.questions.map((question, idx ) => {
              return (<h3 key={idx}>{question}=<input name={idx} type="text" />
              {/* {(this.state.result.length === 0) ? '' : this.state.result[idx]}</h3>) */}
              </h3>
            )})}
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}
