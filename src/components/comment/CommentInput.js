import React, { Component } from 'react'


export default class CommentInput extends Component {
  state = {
    username: '',
    content: ''
  }

  handleUsernameChange = (event) => {
    this.setState({username: event.target.value})
  }

  handleContentChange = (event) => {
    this.setState({content: event.target.value})
  }

  handleSubmit = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username: this.state.username, 
        content: this.state.content
      })
    }
    this.setState({content: ''})
  }

  render() {
    return (
      <div>
        <div className='comment-input'>
          <div className='comment-field'>
            <span className='comment-field-name'>Name:</span>
            <div className='comment-field-input'>
              <input value={this.state.username} onChange={this.handleUsernameChange} />
            </div>
          </div>
          <div className='comment-field'>
            <span className='comment-field-name'>Content:</span>
            <div className='comment-field-input'>
              <textarea value={this.state.content} onChange={this.handleContentChange} />
            </div>
          </div>
          <div className='comment-field-button'>
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    )
  }
}
