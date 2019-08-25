import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Setting extends Component {

  state = {
    difficulty: 'easy',
    number: 1,
  }

  changeDifficulty = (event) => {
    this.setState({difficulty: event.target.value});
    console.log('Setting difficulty:', event.target.value)
  }

  changeNumber = (event) => {
    this.setState({number: event.target.value});
    console.log('Setting number:', event.target.value)
  }

  render() {
    return (
      <div>
        <center><h1 className='text-blue'>Welcome to Alex's Maths World</h1>
          <h3>
            <div className='mx-auto'>
              <input type="radio" name='difficulty' value="easy" onChange={this.changeDifficulty} checked />Easy
              <input type="radio" name='difficulty' value="medium" onChange={this.changeDifficulty} />Medium
              <input type="radio" name='difficulty' value="hard" onChange={this.changeDifficulty} />Hard
              <input type="radio" name='difficulty' value="extreme" onChange={this.changeDifficulty} />Extreme
            </div>
          </h3>
          <h5>How many questions do you want?
            <select name="number" onChange={this.changeNumber}>
              {[...Array(10).keys()].map(value => {
                return <option key={value + 1} value={value + 1}>{value + 1}</option>
              })}
            </select>
          </h5>
          <Link to={{
            pathname: '/question',
            state: {
              difficulty: this.state.difficulty,
              number: this.state.number,
            }
          }}>
            <input type="submit" value="Start" />
          </Link>
        </center>
      </div>
    )
  }
}
