import React, { Component } from 'react'

export default class Setting extends Component {

  state = {
    difficulty: 'easy',
    number: 1,
  }

  changeDifficulty = (event) => {
    this.setState({difficulty: event.target.value})
  }

  changeNumber = (event) => {
    this.setState({number: event.target.value})
  }

  handleSubmit = (event) => {
    let params = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: {
        difficulty: this.state.difficulty,
        number: this.state.number,
      }
    }
    fetch('localhost:5000/questions', params)
      .then(response => response.json())
      .then(data => this)
    console.log('submitted bla')
  }

  render() {
    return (
      <div>
        <center><h1 className='text-blue'>Welcome to Alex's Maths World</h1></center>
        <form onSubmit={this.handleSubmit} >
          <center>
            <h3>
              <input type="radio" value="easy" onChange={this.changeDifficulty} />Easy
              <input type="radio" value="medium" onChange={this.changeDifficulty} />Medium
              <input type="radio" value="hard" onChange={this.changeDifficulty} />Hard
              <input type="radio" value="extreme" onChange={this.changeDifficulty} />Extreme
            </h3>
            <h5>How many questions do you want?
              <select name="number">
                <option value='1' onChange={this.changeNumber}>1</option>
                <option value="2" onChange={this.changeNumber}>2</option>
                <option value="3" onChange={this.changeNumber}>3</option>
                <option value="4" onChange={this.changeNumber}>4</option>
                <option value="5" onChange={this.changeNumber}>5</option>
              </select>
            </h5>
            <input type="submit" value="Start" />
          </center>
        </form>
      </div>
    )
  }
}
